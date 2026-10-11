import React, { useState } from 'react';
// AISearch কে components ফোল্ডার থেকে ইমপোর্ট করা হচ্ছে
import AISearch from './components/AISearch';

function App() {
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState('customer');
  const [compareList, setCompareList] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // ব্যাংক অ্যাকাউন্ট ও ট্রানজেকশন স্টেট
  const [bankName, setBankName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [trxId, setTrxId] = useState('');

  // মোবাইল ব্যাংকিং লোগোগুলো
  // মোবাইল ব্যাংকিং লোগোগুলো (নতুন ওয়ার্কিং লিংক)
  // মোবাইল ব্যাংকিং লোগোগুলো
  const paymentLogos = {
    bkash: 'https://freelogopng.com/images/all_img/1656234782bkash-app-logo.png',
    nagad: 'https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png',
    rocket: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Rocket_by_DBBL.svg/512px-Rocket_by_DBBL.svg.png'
  };
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleCompare = (product) => {
    if (compareList.find(item => item.id === product.id)) {
      setCompareList(compareList.filter(item => item.id !== product.id));
    } else {
      if (compareList.length >= 2) {
        alert("সর্বোচ্চ ২টি পণ্য একসাথে তুলনা করা যাবে!");
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setCart([]);
    setTrxId('');
    setBankName('');
    setAccNumber('');
    setTimeout(() => {
      setOrderSuccess(false);
      setShowCheckout(false);
    }, 5000);
  };

  return (
    <div style={{ backgroundColor: '#141b24', color: '#ffffff', minHeight: '100vh', padding: '20px', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', borderBottom: '2px solid #1e3a8a', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', margin: 0 }}>🛒 AI Smart Cart System</h1>
        <div style={{ backgroundColor: '#1e293b', padding: '10px 15px', borderRadius: '8px', border: '1px solid #334155' }}>
          <label style={{ marginRight: '10px', color: '#94a3b8' }}>ইউজার রোল:</label>
          <select value={userRole} onChange={(e) => setUserRole(e.target.value)} style={{ padding: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '4px' }}>
            <option value="customer">Customer (কাস্টমার)</option>
            <option value="admin">Admin (অ্যাডমিন)</option>
          </select>
        </div>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '25px' }}>
        {/* বাম পাশ - সার্চ ও তুলনা */}
        <div>
          <AISearch onAddToCart={addToCart} onToggleCompare={toggleCompare} compareList={compareList} />
          
          {compareList.length > 0 && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #38bdf8' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>📊 Product Comparison Matrix</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareList.length}, 1fr)`, gap: '20px', marginTop: '15px' }}>
                {compareList.map(item => (
                  <div key={item.id} style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
                    <h4 style={{ margin: '5px 0' }}>{item.title}</h4>
                    <p style={{ color: '#38bdf8', fontWeight: 'bold' }}>দাম: {item.price} BDT</p>
                    <p style={{ fontSize: '13px', color: '#94a3b8' }}>{item.description}</p>
                    <button onClick={() => toggleCompare(item)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>বাদ দিন</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ডান পাশ - শপিং কার্ট ও গেটওয়ে পেমেন্ট */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', height: 'fit-content' }}>
          <h3>🛍️ Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} Items)</h3>
          
          {cart.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>কার্ট সম্পূর্ণ খালি। পণ্য যুক্ত করুন।</p>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', padding: '10px 0' }}>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '15px' }}>{item.title}</h5>
                    <small style={{ color: '#38bdf8' }}>{item.price} BDT x {item.quantity}</small>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>মুছুন</button>
                </div>
              ))}
              
              <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #334155' }}>
                <h4 style={{ color: '#38bdf8' }}>সর্বমোট: {totalAmount} BDT</h4>
                {!showCheckout && (
                  <button onClick={() => setShowCheckout(true)} style={{ width: '100%', backgroundColor: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Proceed to Payment (চেকআউট)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 💳 ডিজিটাল পেমেন্ট গেটওয়ে উইন্ডো */}
          {showCheckout && cart.length > 0 && (
            <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #475569' }}>
              <h4 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '15px' }}>💳 Secure Payment Gateway</h4>
              
              <form onSubmit={handleCheckoutSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' }}>পেমেন্ট মাধ্যম নির্বাচন করুন:</label>
                  <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #475569', borderRadius: '6px' }}>
                    <option value="bkash">bKash (বিকাশ)</option>
                    <option value="nagad">Nagad (নগদ)</option>
                    <option value="rocket">Rocket (রকেট)</option>
                    <option value="bank">Bank Account (ব্যাংক অ্যাকাউন্ট)</option>
                  </select>
                </div>

                {/* মোবাইল ব্যাংকিং উইন্ডো (বিকাশ, নগদ, রকেট) */}
                {paymentMethod !== 'bank' && (
                  <div style={{ textAlign: 'center', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #334155' }}>
                    
                    {/* লোগো দেখাচ্ছে */}
                    <img src={paymentLogos[paymentMethod]} alt={paymentMethod} style={{ height: '40px', objectFit: 'contain', marginBottom: '10px' }} />
                    
                    <h5 style={{ margin: '0 0 5px 0', color: '#f59e0b', fontSize: '14px' }}>📱 MFS Agent Payment Mode</h5>
                    <p style={{ fontSize: '12px', margin: '5px 0', color: '#cbd5e1' }}>নিচের এজেন্ট নম্বরে ক্যাশ-আউট করুন:</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', backgroundColor: '#0f172a', padding: '6px', borderRadius: '6px', letterSpacing: '1px', margin: '5px 0' }}>01884644602</p>
                    
                    {/* রিয়েল কিউআর কোড জেনারেটর (QR Scanner) */}
                    <div style={{ margin: '15px auto', width: '140px', height: '140px', backgroundColor: '#fff', padding: '8px', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PaymentTo_01884644602_Via_${paymentMethod}`} 
                        alt="Payment QR Code" 
                        style={{ width: '100%', height: '100%', display: 'block' }}
                      />
                    </div>
                    <small style={{ color: '#94a3b8', display: 'block', marginBottom: '10px' }}>[আপনার {paymentMethod.toUpperCase()} অ্যাপ দিয়ে কিউআর স্ক্যান করুন]</small>
                    <input type="text" placeholder="Transaction ID (TrxID) বসান" value={trxId} onChange={(e) => setTrxId(e.target.value)} required style={{ width: '90%', padding: '8px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '4px', textAlign: 'center' }} />
                  </div>
                )}

                {/* ব্যাংক অ্যাকাউন্ট পেমেন্ট গেটওয়ে উইন্ডো */}
                {paymentMethod === 'bank' && (
                  <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #334155' }}>
                    <h5 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '14px' }}>🏦 Direct Bank Transfer</h5>
                    
                    <div style={{ marginBottom: '10px' }}>
                      {/* ব্যাংকের ড্রপডাউন লিস্ট */}
                      <select value={bankName} onChange={(e) => setBankName(e.target.value)} required style={{ width: '100%', padding: '8px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }}>
                        <option value="">-- ব্যাংক নির্বাচন করুন --</option>
                        <option value="brac">BRAC Bank (ব্র্যাক ব্যাংক)</option>
                        <option value="city">City Bank (সিটি ব্যাংক)</option>
                        <option value="dbbl">Dutch-Bangla Bank (ডাচ-বাংলা ব্যাংক)</option>
                        <option value="ibbl">Islami Bank (ইসলামী ব্যাংক)</option>
                        <option value="ebl">Eastern Bank (ইবিএল)</option>
                      </select>
                    </div>
                    <div>
                      <input type="text" placeholder="Account Number (অ্যাকাউন্ট নম্বর)" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} required style={{ width: '100%', padding: '8px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '4px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                )}

                <button type="submit" style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Place Order (অর্ডার করুন)
                </button>
              </form>
            </div>
          )}
          
          {orderSuccess && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#10b981', color: 'white', textAlign: 'center', borderRadius: '6px', fontWeight: 'bold' }}>
              ✅ পেমেন্ট সফল হয়েছে! আপনার অর্ডার কনফার্মড।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;