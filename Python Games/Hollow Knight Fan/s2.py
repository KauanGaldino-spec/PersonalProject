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

# Initialize display
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Silksong: Boss Battle")
clock = pygame.time.Clock()

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
        self.dash_timer - 0
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
        if self.dash_cooldowns > 0:
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

    def draw(self, amount):
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
        pygame.draw.rect(screen, WHITE, (bar_x, 20, bar_w, 15, 2))

        

     
        