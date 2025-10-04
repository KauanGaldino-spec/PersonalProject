import pygame
import random
import math

pygame.init()

# Constants
WIDTH, HEIGHT = 900, 700
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 50, 50)
PURPLE = (180, 100, 220)
CYAN = (100, 200, 255)
YELLOW = (255, 220, 100)
GREEN = (100, 220, 100)
ORANGE = (255, 150, 50)
DARK_PURPLE = (80, 40, 100)
GRAY = (50, 50, 60)

# Initialize display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Silksong: Boss Battle")
clock = pygame.time.Clock()

class Projectile:
    def __init__(self, x, y, vel_x, vel_y):
        self.x = x
        self.y = y
        self.w = 10
        self.h = 10
        self.vel_x = vel_x
        self.vel_y = vel_y

    def update(self):
        self.x += self.vel_x
        self.y += self.vel_y

    def check_hit(self, target):
        return (self.x < target.x + target.w and
                self.x + self.w > target.x and
                self.y < target.y + target.h and
                self.y + self.h > target.y)

    def draw(self, screen):
        pygame.draw.rect(screen, ORANGE, (self.x, self.y, self.w, self.h))

class Player:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.w = 25
        self.h = 35
        self.vel_x = 0
        self.vel_y = 0
        self.speed = 6
        self.jump_power = 12
        self.on_ground = False
        self.on_wall = False
        self.wall_side = 0 # -1 left, 1 right
        self.health = 150
        self.max_health = 150
        self.facing_right = True
        self.dash_timer = 0
        self.can_dash = True
        self.invincible = 0
        self.attack_cooldown = 0

    def move(self, keys, walls):
        # Dash
        if keys[pygame.K_LSHIFT] and self.can_dash and self.dash_cooldown == 0:
            self.dash_timer = 10
            self.dash_cooldown = 60
            self.can_dash = False

        if self.dash_timer > 0:
            dash_speed = 15
            self.vel_x = dash_speed if self.facing_right else -dash_speed
            self.vel_y = 0
            self.dash_timer -= 1
        else:
            # Normal horizontal movement
            self.vel_x = 0
            if keys[pygame.K_LEFT] or keys[pygame.K_a]:
                self.vel_x = -self.speed
                self.facing_right = False
            if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
                self.vel_x = self.speed
                self.facing_right = True

        self.x += self.vel_x

        # Check wall collison
        self.on_wall = False
        self.wall_side = 0
        for wall in walls:
            if (self.y + self.h > wall.y and self.y < wall.y + wall.h):
                if (self.x < wall.x and self.x + self.w > wall.x and self.vel_x > 0):
                    self.on_wall = True
                    self.wall_side = -1
                    self.wall_dash = True
                elif self.x + self.w > wall.x + wall.w and self.x < wall.x + wall.w and self.vel_x < 0:
                    self.x = wall.x + wall.w
                    self.on_wall = True
                    self.wall_side = 1
                    self.wall_dash = True

        # Gravity
        if self.on_wall and not self.on_ground:
            if self.vel_y > 2:
                self.vel_y = 2

        self.y += self.vel_y

        # Ground collison
        self.on_ground = False
        for wall in walls:
            if (self.x + self.w > wall.x and self.x < wall.x + wall.w and
                self.y + self.h > wall.y and self.y + self.h < wall.y + 15 and
                self.vel_y > 0):
                self.y = wall.y - self.h
                self.vel_y = 0
                self.on_ground = True
                self.can_dash = True
        
        # Jump and wall jump
        if keys[pygame.K_SPACE] or keys[pygame.K_w] or keys[pygame.K_UP]:
            if self.on_ground:
                self.vel_y = -self.jump_power
            elif self.on_wall:
                self.vel_y = -self.jump_power
                self.vel_x = self.wall_side * 8

        # Cooldowns
        if self.dash_cooldown > 0:
            self.dash_cooldown -= 1
        if self.invincible > 0:
            self.invincible -= 1
        if self.attack_cooldown > 0:
            self.attack_cooldown -= 1

        # Keep in bounds
        if self.x < 0:
            self.x = 0
        if self.x + self.w > WIDTH:
            self.x = WIDTH - self.w
        if self.y > HEIGHT:
            self.health = 0

    def attack(self):
        if self.attack_cooldown == 0:
            self.attack_cooldown = 15
            return True
        return False
    
    def take_damage(self, amount):
        if self.invincible == 0:
            self.health -= amount
            self.invincible = 60

    def draw(self, screen):
        if self.invincible % 4 < 2:
            color = CYAN if self.dash_timer > 0 else PURPLE
            pygame.draw.rect(screen, color, (self.x, self.y, self.w, self.h))

            # Eye
            eye_x = self.x + (self.w - 5 if self.facing_right else 5)
            pygame.draw.circle(screen, YELLOW, (int(eye_x), int (self.y + 12)), 4)

        # Health bar
        bar_w = 100
        bar_x = WIDTH // 2 - bar_w // 2
        pygame.draw.rect(screen, RED, (bar_x, 20, bar_w, 15))
        pygame.draw.rect(screen, GREEN, (bar_x, 20, bar_w * (self.health / self.max_health), 15))
        pygame.draw.rect(screen, WHITE, (bar_x, 20, bar_w, 15), 2)

        # Dash indicator
        if not self.dash_cooldown > 0:
            dash_fill = 50 * ((60 - self.dash_cooldown) / 60)
            pygame.draw.rect(screen, CYAN, (bar_x, 40, dash_fill, 8))
        else:
            pygame.draw.rect(screen, CYAN, (bar_x, 40, 50, 8))
        pygame.draw.rect(screen, WHITE, (bar_x, 40, 50, 8), 2)

class Boss:
    def __init__(self, x ,y):
        self.x = x
        self.y = y
        self.w = 80
        self.h = 100
        self.health = 500
        self.max_health = 500
        self.phase = 1
        self.attack_timer = 0
        self.attack_type = 0
        self.vel_x = 0
        self.vel_y = 0
        self.facing_right = False
        self.projectiles = []
        self.animation = 0

    def update(self, player, walls):
        self.animation += 1

        # AI behavior
        if self.attack_timer == 0:
            if self.phase == 1:
                self.attack_type = random.choice([1, 2])
                self.attack_timer = 120
            else: # Phase 2
                self.attack_type = random.choice([1, 2, 3])
                self.attack_timer = 90

        self.attack_timer -= 1

        # Attack patterns
        if self.attack_timer == 60:
            if self.attack_type == 1: # Projectile spray
                for i in range(8):
                    angle = (math.pi * 2 / 8) * i
                    self.projectiles.append(Projectile(
                    self.x + self.w // 2,
                    self.y + self.h // 2,
                    math.cos(angle) * 5,
                    math.sin(angle) * 5
                ))
        elif self.attack_type == 2: # Ground slam
            self.vel_y = -15
        elif self.attack_type == 3: # Aimed shot
            dx = player.x - self.x
            dy = player.y - self.y
            dist = math.hypot(dx, dy)
            if dist > 0:
                self.projectiles.append(Projectile(
                    self.x + self.w // 2,
                    self.y + self.h // 2,
                    (dx / dist) * 6,
                    (dy / dist) * 6
                ))

        # Gravity
        self.vel_y += 0.8
        if self.vel_y > 15:
            self.vel_y = 15

        self.y += self.vel_y

        # Ground collision
        self.on_ground = False
        for wall in walls:
            if (self.x + self.w > wall.x and self.x < wall.x + wall.w and
                self.y + self.h > wall.y and self.y + self.h < wall.y + 20 and
                self.vel_y > 0):
                self.y = wall.y - self.h
                self.vel_y = 0
                self.on_ground = True

        # Phase transition
        if self.health < self.max_health // 2 and self.phase == 1:
            self.phase = 2

        # Update projectiles
        for proj in self.projectiles[:]:
            proj.update()
            if proj.x < 0 or proj.x > WIDTH or proj.y < 0 or proj.y > HEIGHT:
                self.projectiles.remove(proj)
            elif proj.check_hit(player):
                player.take_damage(10)
                self.projectiles.remove(proj)

    def take_damage(self, amount):
        self.health -= amount

    def draw(self, screen):
        # Body
        color = RED if self.phase == 2 else DARK_PURPLE
        pygame.draw.rect(screen, color, (self.x, self.y, self.w, self.h))
        
        # Eyes
        eye_y = self.y + 30
        pygame.draw.circle(screen, YELLOW, (int(self.x + 20), int(eye_y)), 8)
        pygame.draw.circle(screen, YELLOW, (int(self.x + self.w - 60), int(eye_y)), 8)
        pygame.draw.circle(screen, RED, (int(self.x + self.w - 20), int(eye_y)), 4)
        pygame.draw.circle(screen, RED, (int(self.x + self.w - 60), int(eye_y)), 4)
        
        # Health bar
        bar_w = 200
        bar_x = WIDTH // 2 - bar_w // 2
        pygame.draw.rect(screen, RED, (bar_x, HEIGHT - 40, bar_w, 20))
        pygame.draw.rect(screen, ORANGE, (bar_x, HEIGHT - 40, bar_w * (self.health / self.max_health), 20))
        pygame.draw.rect(screen, WHITE, (bar_x, HEIGHT - 40, bar_w, 20), 3)
        
        # Draw projectiles
        for proj in self.projectiles:
            proj.draw(screen)

class Projectile:
    def __init__(self, x, y, vel_x, vel_y):
        self.x = x
        self.y = y
        self.vel_x = vel_x
        self.vel_y = vel_y
        self.radius = 8

    def update(self):
        self.x += self.vel_x
        self.y += self.vel_y

    def check_hit(self, target):
        dist = math.hypot(self.x - (player.x + player.w/2), self.y - (player.h/2 + player.h/2))
        return dist < self.radius + 15
    
    

    def draw(self, screen):
        pygame.draw.circle(screen, YELLOW, (int(self.x), int(self.y)), self.radius)
        pygame.draw.circle(screen, ORANGE, (int(self.x), int(self.y)), self.radius, -3)

class Wall:
    def __init__(self, x, y, w, h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h

    def draw(self, screen):
        pygame.draw.rect(screen, DARK_PURPLE, (self.x, self.y, self.w, self.h))

# Game setup
player = Player(100, 500)
boss = Boss(WIDTH - 200, 400)

walls = [
    Wall(0, 650, WIDTH, 50),  # Floor
    Wall(0, 0, 20, HEIGHT),  # Left Wall
    Wall(WIDTH - 20, 0, 20, HEIGHT),  # Right Wall
    Wall(150, 500, 150, 20),
    Wall(600, 450, 150, 20),
    Wall(350, 350, 200, 20),
]

font = pygame.font.Font(None, 48)
small_font = pygame.font.Font(None, 28)
game_over = False
victory = False

# Game loop
running = True
while running:
    clock.tick(FPS)
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_r and (game_over or victory):
                player = Player(100, 500)
                boss = Boss(WIDTH - 200, 400)
                game_over = False
                victory = False
            
    if not game_over and not victory:
        keys = pygame.key.get_pressed()

        # Update player
        player.move(keys, walls)

        # Attack
        if keys[pygame.K_x] or keys[pygame.K_j]:
            if player.attack():
                attack_x = player.x + (player.w + 40 if player.facing_right else -40)
                dist = math.hypot(attack_x - (boss.x + boss.w // 2), player.y - (boss.y + boss.h // 2))
                if dist < 60:
                    boss.take_damage(5)

        # Update boss
        boss.update(player, walls)

        # Check game states
        if player.health <= 0:
            game_over = True
        if boss.health <= 0:
            victory = True

        # Draw
        screen.fill(BLACK)

        # Draw walls
        for wall in walls:
            wall.draw(screen)

        # Draw entities
        boss.draw(screen)
        player.draw(screen)

        # Draw UI text
        controls = small_font.render("WASD/Arrows: Move | Space: Jump/Wall Jump | Shift: Dash | X: Attack", True, WHITE)
        screen.blit(controls, (WIDTH // 2 - 350, HEIGHT - 20))

        if victory:
            text = font.render("VICTORY!", True, GREEN)
            restart = small_font.render("Press R to Restart", True, WHITE)
            screen.blit(text, (WIDTH // 2 - 100, HEIGHT // 2 - 50))
            screen.blit(restart, (WIDTH // 2 - 80, HEIGHT // 2 + 10))

    pygame.display.flip()

pygame.quit()