'use client';

import { useState, useEffect } from 'react';

export default function Page() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // State Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // State Register Guru
  const [regNama, setRegNama] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regSekolah, setRegSekolah] = useState('');
  const [regNoHP, setRegNoHP] = useState('');

  // State Sesi
  const [activeSession, setActiveSession] = useState('Memuat...');
  const [jamSesi1, setJamSesi1] = useState('07.30 - 09.00');
  const [jamSesi2, setJamSesi2] = useState('09.30 - 11.00');
  const [jamSesi3, setJamSesi3] = useState('11.30 - 13.00');

  useEffect(() => {
    const savedUser = localStorage.getItem('cbt_user');
    if (savedUser) {
      window.location.href = '/index.html';
    }

    fetch('/api/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'getLandingData', args: [] })
    })
    .then(r => r.json())
    .then(res => {
      if(res.status === 'success') {
         setActiveSession(res.data.SesiAktif || '1');
         setJamSesi1(res.data.JamSesi1 || '07.30 - 09.00');
         setJamSesi2(res.data.JamSesi2 || '09.30 - 11.00');
         setJamSesi3(res.data.JamSesi3 || '11.30 - 13.00');
      }
    })
    .catch(err => console.log('Gagal memuat sesi aktif'));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, tglLahir })
      });
      const result = await res.json();
      if (result.status === 'success') {
        const user = result.data;
        user.LogoUrl = result.logo || 'https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq';
        localStorage.setItem('cbt_user', JSON.stringify(user));
        window.location.href = '/index.html';
      } else {
        alert('Gagal Login: ' + result.msg);
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan atau server tidak merespons.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            action: 'registerGuru', 
            args: [{ nama: regNama, username: regUsername, password: regPassword, sekolah: regSekolah, noHP: regNoHP }] 
        })
      });
      const result = await res.json();
      if (result.status === 'success') {
        alert(result.msg);
        setIsRegisterMode(false);
      } else {
        alert('Gagal Daftar: ' + result.msg);
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      
      <style>{`
        @keyframes heartbeat { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .heartbeat-animation { animation: heartbeat 2s infinite ease-in-out; }
      `}</style>

      <div style={{
        fontFamily: "'Poppins', sans-serif", minHeight: '100vh', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: "linear-gradient(135deg, #064e3b 0%, #15803d 50%, #d4af37 100%)",
        padding: '20px'
      }}>
        
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="row g-4 align-items-center">
            
            {/* BAGIAN KIRI (INFO / LANDING) */}
            <div className="col-lg-7 text-white pe-lg-4 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Tryout Bersama UKI EDUCATION</h2>
              <p className="lead mb-4" style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                Tingkatkan kesiapan siswa Anda dalam menghadapi ujian dengan Tryout Komprehensif berbasis CBT Resmi bersama UKI EDUCATION.
              </p>
              
              <div className="bg-white text-dark p-4 rounded-4 shadow-sm mb-4" style={{ opacity: 0.95 }}>
                <h5 className="fw-bold text-success mb-3"><i className="fas fa-bullhorn me-2"></i>Informasi Pendaftaran</h5>
                <ol className="mb-0 small text-muted" style={{ paddingLeft: '1.2rem', lineHeight: '1.7' }}>
                  <li>Bagi Guru/Sekolah yang belum mendaftar, silakan klik tombol <b>Buat Akun Guru</b> pada panel masuk.</li>
                  <li>Setelah membuat akun, Anda dapat login dan memasukkan <b>Jumlah Peserta</b> yang akan diikutkan.</li>
                  <li>Lakukan konfirmasi pembayaran melalui WhatsApp Admin (085895283075).</li>
                  <li>Setelah disetujui, Anda mendapatkan akses penuh untuk mengelola (Upload Excel) data siswa Anda.</li>
                </ol>
              </div>

              <div className="bg-white text-dark p-4 rounded-4 shadow-sm" style={{ opacity: 0.95 }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-success m-0"><i className="fas fa-calendar-alt me-2"></i>Sesi Ujian Aktif</h5>
                    <span className="badge bg-danger px-3 py-2 fs-6 rounded-pill shadow-sm heartbeat-animation">
                        {activeSession === 'ALL' ? 'Semua Sesi Terbuka' : `Sesi ${activeSession}`}
                    </span>
                </div>
                <div className="d-flex flex-wrap gap-2 small">
                    <span className={`badge border px-3 py-2 shadow-sm ${activeSession === '1' ? 'bg-success text-white border-success' : 'bg-white text-success border-success'}`} style={{ fontSize: '13px' }}>Sesi 1: {jamSesi1}</span>
                    <span className={`badge border px-3 py-2 shadow-sm ${activeSession === '2' ? 'bg-success text-white border-success' : 'bg-white text-success border-success'}`} style={{ fontSize: '13px' }}>Sesi 2: {jamSesi2}</span>
                    <span className={`badge border px-3 py-2 shadow-sm ${activeSession === '3' ? 'bg-success text-white border-success' : 'bg-white text-success border-success'}`} style={{ fontSize: '13px' }}>Sesi 3: {jamSesi3}</span>
                </div>
              </div>
            </div>
            
            {/* BAGIAN KANAN (LOGIN / REGISTER) */}
            <div className="col-lg-5">
              <div style={{
                background: 'white', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                width: '100%', padding: '40px', zIndex: 2
              }}>
                <div className="text-center mb-4">
                  <img src="https://lh3.googleusercontent.com/d/1SCvmdQxuqmX_f0gBaYt0Ob53Tws97Hnq" className="mx-auto d-block mb-3 rounded" width="90" alt="Logo UKI" />
                  <h4 className="fw-bold text-center" style={{ color: '#064e3b', fontSize: '22px' }}>
                    {isRegisterMode ? 'PENDAFTARAN GURU' : 'MASUK UJIAN / DASHBOARD'}
                  </h4>
                </div>

                {!isRegisterMode ? (
                    /* FORM LOGIN */
                    <form onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control bg-light border-0" placeholder="User" required value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Username</label>
                        </div>
                        <div className="form-floating mb-3 position-relative">
                            <input type={showPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="Pass" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>Password</label>
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`} style={{ cursor: 'pointer', zIndex: 10, fontSize: '1.2rem' }} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="date" className="form-control bg-light border-0" value={tglLahir} onChange={(e) => setTglLahir(e.target.value)} />
                            <label>Tanggal Lahir (Siswa Wajib Isi)</label>
                        </div>
                        <button type="submit" disabled={loading} className="btn w-100 py-3 fw-bold shadow-sm text-white mb-3" style={{ background: 'linear-gradient(90deg, #064e3b 0%, #15803d 100%)', border: 'none', borderRadius: '10px' }}>
                            {loading ? 'MEMPROSES...' : 'MASUK SEKARANG'}
                        </button>
                        <div className="text-center border-top pt-3">
                            <span className="small text-muted d-block mb-2">Belum memiliki akun untuk mendaftarkan Siswa?</span>
                            <button type="button" className="btn btn-outline-success w-100 rounded-pill fw-bold" onClick={() => setIsRegisterMode(true)}>
                                Buat Akun Guru
                            </button>
                        </div>
                    </form>
                ) : (
                    /* FORM REGISTER */
                    <form onSubmit={handleRegister}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control bg-light border-0" placeholder="Nama Lengkap" required value={regNama} onChange={(e) => setRegNama(e.target.value)} />
                            <label>Nama Lengkap Anda</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control bg-light border-0" placeholder="Asal Sekolah" required value={regSekolah} onChange={(e) => setRegSekolah(e.target.value)} />
                            <label>Asal Sekolah / Lembaga</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control bg-light border-0" placeholder="No WA" required value={regNoHP} onChange={(e) => setRegNoHP(e.target.value)} />
                            <label>No. WhatsApp Aktif</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control bg-light border-0" placeholder="Username" required value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
                            <label>Username Baru</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="password" className="form-control bg-light border-0" placeholder="Password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                            <label>Password Akun</label>
                        </div>
                        
                        <button type="submit" disabled={loading} className="btn btn-success w-100 py-3 fw-bold shadow-sm mb-3" style={{ borderRadius: '10px' }}>
                            {loading ? 'MENYIMPAN...' : 'DAFTAR SEKARANG'}
                        </button>
                        <button type="button" className="btn btn-light w-100 fw-bold border" onClick={() => setIsRegisterMode(false)} style={{ borderRadius: '10px' }}>
                            Batal / Kembali Login
                        </button>
                    </form>
                )}

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
