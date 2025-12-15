# 🌌 NASA-API-Complex

[![NASA API](https://img.shields.io/badge/Data-NASA%20API-lightblue?logo=nasa)](https://api.nasa.gov)

> Advanced NASA Data API — REST service integrating NASA API endpoints with smart data handling, combined with Weather API.

---

## Overview

**api-NASA-complex** is an enhanced version of the NASA API integration — designed to showcase multi-endpoint data orchestration, transformation, and response optimization.

It connects with several NASA open data sources (APOD, Mars Rover, NEO, Earth imagery, and more), then combines, filters, and formats the data for efficient use in frontend applications or data visualization tools.

---

## Features

- 🔭 Multi-endpoint data aggregation  
- 🚀 Unified and formatted JSON responses  
- 🌍 Handles NASA API key authentication automatically  
- 🧠 Error handling, caching logic, and parameter validation  
- 💾 Optional database / in-memory caching layer  
- 🧰 Built with clean modular architecture for scalability  

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Environment | dotenv |

---

## Prerequisites

Before you start, ensure you have:

- A valid [NASA API Key](https://api.nasa.gov)  

---

## Installation

```bash
# Clone the repository
git clone https://github.com/AngelBelRoth/api-NASA-complex.git

# Move into the directory
cd api-NASA-complex

# Install dependencies
npm install
