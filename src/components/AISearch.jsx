import React, { useState } from 'react';

// এখানে বিভিন্ন প্রোডাক্টের জন্য আলাদা ছবি (image_url) দেওয়া হয়েছে
const productsData = [
  { id: 1, title: 'Fresh Mango', price: 120, image_url: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=500', description: 'Sweet and fresh Rajshahi mangoes' },
  { id: 2, title: 'Mineral Water', price: 20, image_url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500', description: 'Pure drinking water bottle (1L)' },
  { id: 3, title: 'Energy Drink', price: 80, image_url: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500', description: 'A refreshing cold beverage for instant energy' },
  { id: 4, title: 'Chocolate Milk', price: 50, image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500', description: 'Sweet dairy drink for kids and quick protein' },
  { id: 5, title: 'Instant Oatmeal', price: 250, image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500', description: 'Healthy whole grain oats for quick breakfast' },
  { id: 6, title: 'Fresh Apple', price: 180, image_url: 'https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=500', description: 'Fresh red apples per kg' }
];

function AISearch({ onAddToCart, onToggleCompare, compareList }) {
  const [searchTerm, setSearchTerm] = useState('');

  // সার্চের লেখা অনুযায়ী প্রোডাক্ট ফিল্টার করা
  const filteredProducts = productsData.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#f8fafc' }}>🤖 AI Purpose-Based Search</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products (e.g., mango, water)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
        />
        <button style={{ padding: '10px 20px', backgroundColor: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Search AI
        </button>
      </div>

      <h4 style={{ color: '#94a3b8', marginBottom: '15px' }}>Semantic Recommendations Matrix:</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {filteredProducts.map(product => {
          const isCompared = compareList.find(item => item.id === product.id);
          return (
            <div key={product.id} style={{ backgroundColor: '#0f172a', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
              <img src={product.image_url} alt={product.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#f8fafc' }}>{product.title}</h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#94a3b8', flex: 1 }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{product.price} BDT</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => onAddToCart(product)} style={{ flex: 1, backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize:'12px' }}>Add 🛒</button>
                  <button onClick={() => onToggleCompare(product)} style={{ flex: 1, backgroundColor: isCompared ? '#ef4444' : '#3b82f6', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize:'12px' }}>
                    {isCompared ? 'Remove' : 'Compare 📊'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredProducts.length === 0 && <p style={{ color: '#ef4444' }}>কোনো প্রোডাক্ট পাওয়া যায়নি!</p>}
    </div>
  );
}

export default AISearch;