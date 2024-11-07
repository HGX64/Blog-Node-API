# Blog API

***Language***
- [🇪🇸 Español](./README.es.md)
- 🇺🇸 English

## Dependencies
```bash
# Debian
sudo apt install docker docker-compose

# Arch-Based
sudo pacman -S docker docker-compose
```

Clone repository
```bash[
git clone https://github.com/HGX64/Blog-Express-API
```

## Create .env file with your values
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=very_long_secret_key
JWT_EXPIRE=30d
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your@gmail.com
EMAIL_PASSWORD=your_password
FRONTEND_URL=""
MONGO_DATABASE=blog
MONGO_USER=admin
MONGO_PASSWORD=your_secure_password
MONGO_HOST=localhost
MONGO_PORT=27017
```

## Starting API
```bash
chmod +x start.sh
./start.sh
```

# API usages
## Auth
<p align="center">
<img src="assets/api_auth_docs.png"
        alt="First"
        style="float: left; margin-right: 10px;" />
</p>

## Posts
<p align="center">
<img src="assets/api_posts_docs.png"
        alt="First"
        style="float: left; margin-right: 10px;" />
</p>

## Users
<p align="center">
<img src="assets/api_users_docs.png"
        alt="First"
        style="float: left; margin-right: 10px;" />
</p>

# Extras
## Cookies
<p align="center">
<img src="assets/api_cookies.gif"
        alt="First"
        style="float: left; margin-right: 10px;" />
</p>

## File upload
<p align="center">
<img src="assets/api_upload.gif"
        alt="First"
        style="float: left; margin-right: 10px;" />
</p>
