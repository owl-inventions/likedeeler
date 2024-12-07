![Staging CI](https://github.com/owl-inventions/likedeeler/actions/workflows/staging-ci.yaml/badge.svg)
![Production CI](https://github.com/owl-inventions/likedeeler/actions/workflows/prod-ci.yaml/badge.svg)

# Likedeeler Blog to share ✨ and 🗞️  and as ⚓️ for newcomers/learners.

📚 https://jnhssg.de/blog/2024-09-08

This blog is built with Vue 3 and strapi as headless CMS. It is a simple blog with posts and categories. The blog is built with Strapi as the backend and Vue 3 as the frontend. You can find a hands one README in each of the `client` and `cms` directories.

## Architecture Overview

![Architecture](https://d384izg7dl1mko.cloudfront.net/Screenshot_2024_09_08_at_15_24_33_62c7a276c1.png)

The applications are running on K3s, a lightweight Kubernetes distribution, deployed across a multi-node cluster on Hetzner Cloud. For the design, I utilized Tailwind CSS and DaisyUI to create a clean, responsive interface for both mobile and desktop. All assets served by Strapi are optimized and delivered through the Cloudflare CDN for fast and reliable access.
