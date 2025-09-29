import pygame
import random
import math

pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (220, 50, 50)
PURPLE = (180, 100, 220)
BLUE = (100, 150, 255)
GREEN = (100, 220, 100)
GRAY = (50, 50, 60)

# Initialize display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Silksong-Inspired Adventure")
clock = pygame.time.Clock()

class Player:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.w = 30
        self.h = 40
        self.vel_y = 0
        self.vel_x = 0
        self.speed = 5
        self.jump_power = 15
        self.on_ground = False
        self.health = 100
        self.max_health = 100
        self.facing_right = True
        self.attack_cooldown = 0
        self.attack_range = 60
        
    def move(self, keys, platforms):
        # Horizontal movement
        self.vel_x = 0
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.vel_x = -self.speed
            self.facing_right = False
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.vel_x = self.speed
            self.facing_right = True
            
        self.x += self.vel_x
        
        # Gravity
        self.vel_y += 0.8
        if self.vel_y > 15:
            self.vel_y = 15
            
        self.y += self.vel_y
        
        # Ground collision
        self.on_ground = False
        for platform in platforms:
            if (self.x + self.w > platform.x and self.x < platform.x + platform.w and
                self.y + self.h > platform.y and self.y + self.h < platform.y + 20 and
                self.vel_y > 0):
                self.y = platform.y - self.h
                self.vel_y = 0
                self.on_ground = True
                
        # Jump
        if (keys[pygame.K_SPACE] or keys[pygame.K_w] or keys[pygame.K_UP]) and self.on_ground:
            self.vel_y = -self.jump_power
            
        # Keep player in bounds
        if self.x < 0:
            self.x = 0
        if self.x + self.w > WIDTH:
            self.x = WIDTH - self.w
        if self.y > HEIGHT:
            self.health = 0
            
        # Attack cooldown
        if self.attack_cooldown > 0:
            self.attack_cooldown -= 1
            
    def attack(self):
        if self.attack_cooldown == 0:
            self.attack_cooldown = 20
            return True
        return False
        
    def draw(self, screen):
        # Body
        color = PURPLE if self.attack_cooldown > 0 else BLUE
        pygame.draw.rect(screen, color, (self.x, self.y, self.w, self.h))
        
        # Face direction indicator
        if self.facing_right:
            pygame.draw.rect(screen, WHITE, (self.x + self.w - 8, self.y + 10, 5, 5))
        else:
            pygame.draw.rect(screen, WHITE, (self.x + 3, self.y + 10, 5, 5))
            
        # Health bar
        pygame.draw.rect(screen, RED, (self.x, self.y - 10, self.w, 5))
        pygame.draw.rect(screen, GREEN, (self.x, self.y - 10, self.w * (self.health / self.max_health), 5))

class Enemy:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.w = 25
        self.h = 25
        self.health = 30
        self.speed = 2
        self.direction = random.choice([-1, 1])
        self.patrol_dist = 100
        self.start_x = x
        
    def move(self, platforms):
        self.x += self.speed * self.direction
        
        # Turn around at patrol boundaries
        if abs(self.x - self.start_x) > self.patrol_dist:
            self.direction *= -1
            
        # Apply gravity
        self.y += 5
        for platform in platforms:
            if (self.x + self.w > platform.x and self.x < platform.x + platform.w and
                self.y + self.h > platform.y and self.y + self.h < platform.y + 20):
                self.y = platform.y - self.h
                
    def draw(self, screen):
        pygame.draw.rect(screen, RED, (self.x, self.y, self.w, self.h))
        pygame.draw.circle(screen, WHITE, (int(self.x + 8), int(self.y + 10)), 3)
        pygame.draw.circle(screen, WHITE, (int(self.x + 17), int(self.y + 10)), 3)

class Platform:
    def __init__(self, x, y, w, h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        
    def draw(self, screen):
        pygame.draw.rect(screen, GRAY, (self.x, self.y, self.w, self.h))
        pygame.draw.rect(screen, WHITE, (self.x, self.y, self.w, self.h), 2)

class Particle:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.vel_x = random.uniform(-3, 3)
        self.vel_y = random.uniform(-5, -2)
        self.life = 30
        self.size = random.randint(2, 5)
        
    def update(self):
        self.x += self.vel_x
        self.y += self.vel_y
        self.vel_y += 0.3
        self.life -= 1
        
    def draw(self, screen):
        alpha = int(255 * (self.life / 30))
        color = (alpha, alpha // 2, alpha)
        pygame.draw.circle(screen, color, (int(self.x), int(self.y)), self.size)

# Game setup
player = Player(100, 300)
platforms = [
    Platform(0, 550, WIDTH, 50),
    Platform(200, 450, 150, 20),
    Platform(450, 400, 150, 20),
    Platform(100, 350, 100, 20),
    Platform(600, 300, 150, 20),
    Platform(300, 250, 120, 20)
]

enemies = [
    Enemy(250, 400),
    Enemy(500, 350),
    Enemy(650, 250)
]

particles = []
score = 0
game_over = False
font = pygame.font.Font(None, 36)
small_font = pygame.font.Font(None, 24)

# Game loop
running = True
while running:
    clock.tick(FPS)
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_r and (game_over or len(enemies) == 0):
                # Restart game
                player = Player(100, 300)
                enemies = [Enemy(250, 400), Enemy(500, 350), Enemy(650, 250)]
                particles = []
                score = 0
                game_over = False
                
    if not game_over and len(enemies) > 0:
        keys = pygame.key.get_pressed()
        
        # Update player
        player.move(keys, platforms)
        
        # Attack
        if keys[pygame.K_x] or keys[pygame.K_j]:
            if player.attack():
                # Check for enemy hits
                attack_x = player.x + (player.w + player.attack_range if player.facing_right else -player.attack_range)
                for enemy in enemies[:]:
                    dist = math.hypot(attack_x - enemy.x, player.y - enemy.y)
                    if dist < player.attack_range:
                        enemy.health -= 10
                        for _ in range(5):
                            particles.append(Particle(enemy.x + enemy.w // 2, enemy.y + enemy.h // 2))
                        if enemy.health <= 0:
                            enemies.remove(enemy)
                            score += 10
                            
        # Update enemies
        for enemy in enemies:
            enemy.move(platforms)
            
            # Check collision with player
            if (player.x + player.w > enemy.x and player.x < enemy.x + enemy.w and
                player.y + player.h > enemy.y and player.y < enemy.y + enemy.h):
                player.health -= 1
                
        # Update particles
        for particle in particles[:]:
            particle.update()
            if particle.life <= 0:
                particles.remove(particle)
                
        # Check game over
        if player.health <= 0:
            game_over = True
            
    # Draw
    screen.fill(BLACK)
    
    # Draw platforms
    for platform in platforms:
        platform.draw(screen)
        
    # Draw enemies
    for enemy in enemies:
        enemy.draw(screen)
        
    # Draw particles
    for particle in particles:
        particle.draw(screen)
        
    # Draw player
    player.draw(screen)
    
    # Draw UI
    score_text = small_font.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))
    
    enemy_text = small_font.render(f"Enemies: {len(enemies)}", True, WHITE)
    screen.blit(enemy_text, (10, 35))
    
    if game_over:
        game_over_text = font.render("GAME OVER", True, RED)
        restart_text = small_font.render("Press R to Restart", True, WHITE)
        final_score = small_font.render(f"Final Score: {score}", True, WHITE)
        screen.blit(game_over_text, (WIDTH // 2 - 100, HEIGHT // 2 - 50))
        screen.blit(restart_text, (WIDTH // 2 - 100, HEIGHT // 2))
        screen.blit(final_score, (WIDTH // 2 - 80, HEIGHT // 2 + 30))
        
    if len(enemies) == 0 and not game_over:
        victory_text = font.render("VICTORY!", True, GREEN)
        restart_text = small_font.render("Press R to Play Again", True, WHITE)
        screen.blit(victory_text, (WIDTH // 2 - 80, HEIGHT // 2 - 50))
        screen.blit(restart_text, (WIDTH // 2 - 110, HEIGHT // 2))
    
    pygame.display.flip()

pygame.quit()