# Simple react app. Menu for 10 meal types.

Menu10 is static webapp for working inside Telegram.

It implements the idea of simple menu for ~ 10 type of static products (or meals).

Using this app you can create own small product order service.


## Goals:
Show web app menu with product list.

User can add products to cart.

Web App sends order list to bot it connected to by orer button.



## Next versions:...
This app uses simple rest api from menurest repo and nginx proxy to overcome CORS (react app on 3000 port, rest on 8000 port).

Simple nginx conf:
```
		location /menu_items {
			proxy_pass http://localhost:8000/menu_items;
		}
		
		location / {
			proxy_pass http://localhost:3000;
```