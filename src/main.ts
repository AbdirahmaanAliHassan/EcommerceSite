interface Rating {
    rate: number;
    count: number;
  }
  
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  const productList = document.getElementById('product-list') as HTMLDivElement;
  const productDetails = document.getElementById('product-details') as HTMLDivElement;
  
    //functionka data-da kaso fetch gareynayaa fake api-ga.
  async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await res.json();
    displayProducts(products);
  }

    //  isna waa functionka soo display garaynayaa data-da apiga ku jirta ee productska
  function displayProducts(products: Product[]) {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-2xl transition cursor-pointer';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="h-40 w-full object-contain mb-4">
        <h2 class="text-lg font-semibold mb-2">${product.title.slice(0, 30)}...</h2>
        <p class="text-blue-600 font-bold">$${product.price}</p>
      `;
      card.addEventListener('click', () => showDetails(product));
      productList.appendChild(card);
    });
  }
  
    //waaa functionka kuso saaraya marka itemka lagu dhufto detailkiisa 
  function showDetails(product: Product) {
    productList.classList.add('hidden');
    productDetails.classList.remove('hidden');
  
    productDetails.innerHTML = `
      <button class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onclick="location.reload()">← Back</button>
      
      <div class="flex flex-col md:flex-row gap-8">
        <img src="${product.image}" alt="${product.title}" class="h-64 w-64 object-contain mx-auto">
        <div>
          <h2 class="text-3xl font-bold mb-4">${product.title}</h2>
          <p class="text-gray-700 mb-4">${product.description}</p>
  
          <div class="text-lg font-semibold mb-2">Category: <span class="text-gray-500">${product.category}</span></div>
          <div class="text-2xl text-green-600 font-bold mb-4">$${product.price}</div>
  
          <div class="flex items-center gap-2 text-yellow-500">
            ⭐ ${product.rating.rate} / 5 (${product.rating.count} reviews)
          </div>
        </div>
      </div>
    `;
  }
  
  fetchProducts();
  