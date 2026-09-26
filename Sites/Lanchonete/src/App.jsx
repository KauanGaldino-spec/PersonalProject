import React, { useState, useEffect } from 'react';
import {
  Search, Heart, ShoppingBag, User, ForkKnife, ArrowRight, ChevronLeft, ChevronRight,
  Home, BookOpen, LayoutGrid, Tag, CalendarCheck, ClipboardList, Star, HelpCircle, LogOut
} from 'lucide-react';
import FeatureStrip from './components/Featurestrip';
import ExploreByCuisine from './components/ExploreByCuisine';
import PopularDishes from './components/PopularDishes';
import PromoBanners from './components/PromoBanners';
import Footer from './components/Footer';
import CartDropdown from './components/CartDropdown';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';
import MenuPage from './components/MenuPage';
import CategoriesPage from './components/CategoriesPage';
import OffersPage from './components/OffersPage';
import SupportPage from './components/SupportPage';
import AuthModal from './components/AuthModal';
import FavoritesPage from './components/FavoritesPage';
import OrdersPage from './components/OrdersPage';
import PixPaymentModal from './components/PixPaymentModal';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import AdminSetupBanner from './components/AdminSetupBanner';
import ReviewsPage from './components/ReviewsPage';
import ReservationsPage from './components/ReservationsPage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { toggleFavoriteList } from './utils/items';
import { darkenHex } from './utils/color';

const CulinaryWebsite = () => {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState('Home');
  const [cartItems, setCartItems] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isPixOpen, setIsPixOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  // uid of a signed-in account that should be an admin but is missing from `admins`
  const [adminSetupUid, setAdminSetupUid] = useState(null);
  const [restaurantSettings, setRestaurantSettings] = useState({ name: 'TasteHouse', primaryColor: '#FF6B2B' });

  useEffect(() => {
    let isActive = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isActive) return;
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (!isActive) return;
          if (docSnap.exists()) {
            setFavorites(docSnap.data().favorites || []);
            setSavedAddress(docSnap.data().lastAddress || null);
          } else {
            // New accounts are never admins and only own their favorites list.
            // (Firestore rules allow nothing else in this document.)
            await setDoc(docRef, { favorites: [] });
            setFavorites([]);
            setSavedAddress(null);
          }

          // Admin rights come from the `admins/{uid}` collection, which Firestore
          // rules make read-only for clients — the flag can no longer be
          // self-granted from the browser. Add admins in the Firebase Console.
          const adminSnap = await getDoc(doc(db, 'admins', currentUser.uid));
          if (!isActive) return;
          setIsAdmin(adminSnap.exists());

          // Setup aid so the owner isn't silently locked out after the migration:
          // show a banner with their own uid when the account either still carries
          // the legacy `isAdmin` flag, or the page was opened with ?admin-setup.
          const hasLegacyAdminFlag = docSnap.exists() && docSnap.data().isAdmin === true;
          const askingForSetup = new URLSearchParams(window.location.search).has('admin-setup');

          if (!adminSnap.exists() && (hasLegacyAdminFlag || askingForSetup)) {
            setAdminSetupUid(currentUser.uid);
            console.warn(
              `[TasteHouse] O acesso ao painel mudou: adicione um documento em "admins" ` +
              `com o ID "${currentUser.uid}" no Firebase Console para liberar o Painel Admin.`
            );
          } else {
            setAdminSetupUid(null);
          }
        } catch (err) {
          console.error("Firestore error:", err);
        }
      } else {
        setFavorites([]);
        setIsAdmin(false);
        setAdminSetupUid(null);
        setSavedAddress(null);
      }
    });

    // Listen to Restaurant Settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'restaurant'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRestaurantSettings(data);
        
        // Apply CSS Variables
        if (data.primaryColor) {
          document.documentElement.style.setProperty('--brand-color', data.primaryColor);
          document.documentElement.style.setProperty('--brand-color-dark', darkenHex(data.primaryColor));
        }
        if (data.name) {
          document.title = `${data.name} | Delivery`;
        }
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
      unsubSettings();
    };
  }, []);

  // Re-check admin access on demand (used by the setup banner so you can verify
  // right after creating the document, without a full page reload).
  const refreshAdminAccess = async () => {
    if (!user?.uid) return false;

    try {
      const adminSnap = await getDoc(doc(db, 'admins', user.uid));
      const found = adminSnap.exists();
      setIsAdmin(found);
      // NOTE: the banner itself reports success and then dismisses, so we must not
      // clear adminSetupUid here or the confirmation would never be seen.
      return found;
    } catch (err) {
      console.error("Firestore error:", err);
      return false;
    }
  };

  const toggleFavorite = async (item) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const newFavs = toggleFavoriteList(favorites, item);
    setFavorites(newFavs);

    try {
      await setDoc(doc(db, 'users', user.uid), { favorites: newFavs }, { merge: true });
    } catch (err) {
      console.error("Error saving favorites:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const addToCart = (item) => {
    // Demo/fallback dishes exist only to make an empty menu look alive — ordering
    // them would create an order for a product the restaurant does not sell.
    if (item?.isDemo) {
      console.warn(`[TasteHouse] "${item.name}" é um item de demonstração e não pode ser pedido.`);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, subtitle: item.desc || item.subtitle || '', price: item.price, qty: 1, image: item.image }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter((i) => i.qty > 0)
    );
  };

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Rebuilds the cart from a past order ("Pedir Novamente").
  const handleReorder = (order) => {
    const orderItems = order?.items || [];
    if (orderItems.length === 0) return;

    setCartItems((prev) => {
      const next = [...prev];
      orderItems.forEach((item) => {
        const index = next.findIndex((cartItem) => cartItem.id === item.id);
        if (index >= 0) {
          next[index] = { ...next[index], qty: next[index].qty + item.qty };
        } else {
          next.push({
            id: item.id,
            name: item.name,
            subtitle: item.subtitle || '',
            price: item.price,
            qty: item.qty,
            image: item.image,
          });
        }
      });
      return next;
    });

    setActivePage('Menu');
  };

  const handleCheckout = async (discountInfo, finalTotal) => {
    if (!user) {
      setIsAuthOpen(true);
      return false; // Tells CartDropdown it didn't succeed (so it doesn't close yet)
    }
    if (cartItems.length === 0) return false;

    // Step 1: delivery details. Payment (PIX) comes after, in confirmCheckout.
    setPendingOrder({ discountInfo, finalTotal });
    setIsCheckoutOpen(true);
    return true; // Closes the cart dropdown
  };

  // Step 2: the address is valid -> remember it for next time, then pay.
  const confirmCheckout = ({ customer, address, savedAddress: reusable }) => {
    setPendingOrder((prev) => ({ ...prev, customer, address }));
    setIsCheckoutOpen(false);
    setIsPixOpen(true);

    // Best effort: never blocks the order if the write fails.
    if (user) {
      setSavedAddress(reusable);
      setDoc(doc(db, 'users', user.uid), { lastAddress: reusable }, { merge: true }).catch((err) => {
        console.error('Could not save the address for reuse:', err);
      });
    }
  };

  const confirmPixPayment = async () => {
    if (!pendingOrder || !user) return;
    
    try {
      const orderData = {
        userId: user.uid,
        items: cartItems,
        total: pendingOrder.finalTotal,
        discount: pendingOrder.discountInfo,
        status: 'preparing',
        createdAt: serverTimestamp(),
        restaurant: restaurantSettings?.name || 'TasteHouse',
        customer: pendingOrder.customer,
        address: pendingOrder.address,
      };

      await addDoc(collection(db, 'orders'), orderData);
      setCartItems([]); // Clear the cart
      setIsPixOpen(false); // Close PIX modal
      setPendingOrder(null);
      setActivePage('Orders'); // Redirect to orders page
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Não foi possível finalizar o pedido. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1">
        <Sidebar 
          active={activePage} 
          onNavigate={setActivePage} 
          isAdmin={isAdmin} 
          restaurantName={restaurantSettings?.name || 'TasteHouse'} 
        />
        <div className="flex-1">
          <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); setActivePage('Home'); }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-color)]">
                  <ForkKnife className="h-5 w-5 text-white" />
                </span>
                <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                  {restaurantSettings?.name || 'TasteHouse'}
                </span>
              </a>

              {/* Search */}
              <div className="hidden flex-1 max-w-xl mx-4 sm:mx-8 md:flex">
                <div className="relative flex w-full items-center">
                  <Search className="absolute left-4 h-4 w-4 text-[#9E9E9E]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setActivePage('Menu');
                    }}
                    placeholder="Busque por pratos..."
                    className="w-full rounded-full bg-[#F7F7F7] py-2.5 pl-10 pr-14 text-sm text-[#1A1A1A] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[var(--brand-color)]/40"
                  />
                  <button
                    type="button"
                    onClick={() => { setActivePage('Menu') }}
                    className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-color)] text-white transition hover:bg-[var(--brand-color-dark)]"
                    aria-label="Buscar"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right actions */}
              <nav className="flex items-center gap-1 sm:gap-2">
                <button 
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[#1A1A1A] transition hover:bg-[#F7F7F7]"
                  onClick={() => setActivePage('Favorites')}
                >
                  <Heart className={`h-5 w-5 ${activePage === 'Favorites' ? 'fill-[var(--brand-color)] text-[var(--brand-color)]' : ''}`} />
                  <span className="hidden sm:inline">Favoritos</span>
                  {favorites.length > 0 && (
                    <span className="ml-1 rounded-full bg-[var(--brand-color)] px-2 py-0.5 text-xs text-white">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <CartDropdown 
                  items={cartItems} 
                  onUpdateQty={updateCartQty} 
                  onRemove={removeCartItem} 
                  onCheckout={handleCheckout}
                  deliveryFee={restaurantSettings?.deliveryFee || 0}
                />

                {user ? (
                  <div className="flex items-center gap-2">
                    <img 
                      src={user.photoURL || 'https://via.placeholder.com/150'} 
                      alt="User Avatar" 
                      className="h-9 w-9 rounded-full border border-[#E0E0E0] object-cover"
                      title={user.displayName}
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0E0E0] text-[#1A1A1A] transition hover:border-[var(--brand-color)] hover:text-[var(--brand-color)]"
                      onClick={handleLogout}
                      title="Sair da conta"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0E0E0] text-[#1A1A1A] transition hover:border-[var(--brand-color)]"
                    onClick={() => setIsAuthOpen(true)}
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
              </nav>
            </div>
          </header>

          {/* Setup aid after the admin-rights migration (see FIREBASE_SECURITY_SETUP.md) */}
          {adminSetupUid && (
            <AdminSetupBanner
              uid={adminSetupUid}
              onRetry={refreshAdminAccess}
              onDismiss={() => setAdminSetupUid(null)}
            />
          )}

          {activePage === 'Home' ? (
            <>
              {/* Hero Banner */}
              <section
                className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6"
                style={{
                  background:
                    'linear-gradient(135deg, #FFF7EC 0%, #FDECD6 55%, #FDE7C9 100%)',
                }}
              >
                <div className="grid items-center gap-8 py-12 lg:grid-cols-2">
                  <div className="relative z-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--brand-color)]">
                      {restaurantSettings?.slogan || 'COMIDA BOA, HUMOR BOM'}
                    </p>
                    <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
                      <span className="block">Comida Deliciosa</span>
                      <span className="block text-[var(--brand-color)]">Entregue Rápido.</span>
                    </h1>
                    <p className="mb-8 max-w-md text-base text-[#5A5A5A]">
                      Descubra os melhores restaurantes, cozinhas e ofertas exclusivas perto de você.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <button 
                        className="flex items-center gap-2 rounded-full bg-[var(--brand-color)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--brand-color-dark)]"
                        onClick={() => setActivePage('Menu')}
                      >
                        Pedir Agora
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                      <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1A1A1A] shadow-md transition hover:bg-[#F7F7F7]" onClick={() => setActivePage('Categories')}>
                        Ver Cardápio
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-color)] text-white">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                    <div className="mt-10 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <img src="https://i.pravatar.cc/100?img=12" alt="Customer" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                        <img src="https://i.pravatar.cc/100?img=33" alt="Customer" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                        <img src="https://i.pravatar.cc/100?img=20" alt="Customer" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                        <img src="https://i.pravatar.cc/100?img=5" alt="Customer" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                      </div>
                      <span className="text-sm font-medium text-[#5A5A5A]">
                        <span className="font-bold text-[#1A1A1A]">50K+</span> Happy Customers
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative mx-auto w-full max-w-lg">
                      <img src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?fm=jpg&q=80&w=900&auto=format&fit=crop" alt="Spicy Zinger Burger" className="w-full rounded-3xl object-cover shadow-2xl" />
                      <div className="absolute -left-4 top-1/2 w-56 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-xl">
                        <p className="text-sm font-bold text-[#1A1A1A]">Spicy Zinger Burger</p>
                        <p className="mb-1 text-xs text-[#9E9E9E]">Crispy chicken burger</p>
                        <p className="text-lg font-extrabold text-[var(--brand-color)]">R$ 8.99</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1A1A1A] shadow-md transition hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-color)]" />
                    <span className="h-2 w-2 rounded-full bg-[#FFB7A3]" />
                    <span className="h-2 w-2 rounded-full bg-[#FFB7A3]" />
                  </div>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1A1A1A] shadow-md transition hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
                </div>
              </section>
              <FeatureStrip />
              <ExploreByCuisine onNavigate={setActivePage} />
              <PopularDishes favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} onNavigate={setActivePage} />
              <PromoBanners onNavigate={setActivePage} />
            </>
          ) : activePage === 'Menu' ? (
            <MenuPage onAddToCart={addToCart} favorites={favorites} onToggleFavorite={toggleFavorite} searchQuery={query} />
          ) : activePage === 'Categories' ? (
            <CategoriesPage onNavigate={setActivePage} />
          ) : activePage === 'Offers' ? (
            <OffersPage />
          ) : activePage === 'Favorites' ? (
            <FavoritesPage 
              favorites={favorites} 
              onRemoveFavorite={toggleFavorite} 
              onAddToCart={addToCart} 
              onNavigate={setActivePage} 
            />
          ) : activePage === 'Support' ? (
            <SupportPage restaurantSettings={restaurantSettings} user={user} />
          ) : activePage === 'Orders' ? (
            <OrdersPage
              onNavigate={setActivePage}
              user={user}
              onReorder={handleReorder}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          ) : activePage === 'Admin' ? (
            <AdminDashboard onNavigate={setActivePage} />
          ) : activePage === 'Reviews' ? (
            <ReviewsPage user={user} onOpenAuth={() => setIsAuthOpen(true)} />
          ) : activePage === 'Reservations' ? (
            <ReservationsPage user={user} onNavigate={setActivePage} />
          ) : (
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[var(--brand-color)]">
                  {(() => {
                    const icons = { Categories: LayoutGrid, Offers: Tag, Reservations: CalendarCheck, Orders: ClipboardList, Reviews: Star, Support: HelpCircle };
                    const I = icons[activePage];
                    return I ? <I className="h-6 w-6" /> : null;
                  })()}
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#1A1A1A]">{activePage}</h2>
                  <p className="text-sm text-[#9E9E9E]">Explore nossa seção {activePage.toLowerCase()}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-[#E0E0E0] bg-[#FAFAFA] p-12 text-center">
                <p className="text-lg font-semibold text-[#5A5A5A]">🚧 Página {activePage} em breve!</p>
                <p className="mt-2 text-sm text-[#9E9E9E]">Estamos trabalhando para trazer conteúdos incríveis aqui.</p>
                <button onClick={() => setActivePage('Home')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-color)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-color-dark)]">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Voltar ao Início
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer — full width */}
      <Footer />

      {/* Mobile menu (floating button + drawer, visible < lg) */}
      <MobileMenu
        active={activePage}
        onNavigate={setActivePage}
        isAdmin={isAdmin}
        restaurantName={restaurantSettings?.name || 'TasteHouse'}
      />

      {/* Auth Modal Overlay */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setPendingOrder(null);
        }}
        onSubmit={confirmCheckout}
        initialData={savedAddress}
        total={pendingOrder?.finalTotal || 0}
      />
      <PixPaymentModal 
        isOpen={isPixOpen} 
        onClose={() => setIsPixOpen(false)} 
        total={pendingOrder?.finalTotal || 0}
        address={pendingOrder?.address}
        onConfirm={confirmPixPayment}
        pixKey={restaurantSettings?.pixKey}
        restaurantName={restaurantSettings?.name}
        restaurantCity={restaurantSettings?.city}
      />
    </div>
  );
};

export default CulinaryWebsite;