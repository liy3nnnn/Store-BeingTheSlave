let currentPackage = "";
let currentPrice = "";

const ROLE_ID = "1219493668541693953";

function openModal(name, price) {
    currentPackage = name;
    currentPrice = price;

    const modal = document.getElementById("checkoutModal");
    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    document.getElementById("packageTitle").innerText = name;
    document.getElementById("packagePrice").innerText = "₹" + price;

    showStep(1);
}

function closeModal() {
    document.getElementById("checkoutModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function showStep(step) {
    document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
    document.getElementById("step" + step).classList.add("active");

    document.getElementById("progressFill").style.width = (step * 25) + "%";
}

function nextStep(current) {
    if (current === 1 && !document.getElementById("agreeCheck").checked) {
        alert("Accept terms first");
        return;
    }
    showStep(current + 1);
}

async function submitOrder() {
    const discordId = document.getElementById("discordId").value;
    const file = document.getElementById("paymentFile").files[0];

    if (!discordId) return alert("Enter Discord ID");
    if (!file) return alert("Upload screenshot");

    const formData = new FormData();

    // ✅ KEEP YOUR ORIGINAL FILE (JUST ADD NAME)
    formData.append("file", file, "payment.png");

    // ✅ KEEP YOUR ORIGINAL MESSAGE + ADD EMBED (NOT REMOVING ANYTHING)
    formData.append("payload_json", JSON.stringify({
        content:
`
# CHECK THE DETAILS AND GIVE THE ROLES AS PER NAD CONFIRM THE PAYMENT HAS CREDITED🎯 <@&1219493668541693953>`,

        embeds: [
            {
                title: "🛒 New Purchase",
                description: "Premium role purchase submitted",
                color: 5814783,

                fields: [
                    {
                        name: "📦 Package",
                        value: currentPackage,
                        inline: true
                    },
                    {
                        name: "💰 Price",
                        value: "₹" + currentPrice,
                        inline: true
                    },
                    {
                        name: "👤 User",
                        value: `<@${discordId}>`,
                        inline: false
                    }
                ],

                image: {
                    url: "attachment://payment.png"
                },

                footer: {
                    text: "Being The Slave Store • Verify before role assign"
                },

                timestamp: new Date()
            }
        ]
    }));

    // 🔥 NEW: SHOW LOADING UI
    const loadingBox = document.getElementById("loadingBox");
    if (loadingBox) {
        loadingBox.classList.remove("hidden");
    }

    closeModal();

    // 🔥 NEW: FAKE DELAY (premium feel)
    await new Promise(resolve => setTimeout(resolve, 1800));

    await fetch("https://discord.com/api/webhooks/1500755506875338772/myIyVhpWMoFVNSOZDjzLcP3hnsXT6CkADnx4v8_7B41ZDD9n8yL7I67s28TmLkFiEMP0", {
        method: "POST",
        body: formData
    });

    // 🔥 NEW: HIDE LOADING
    if (loadingBox) {
        loadingBox.classList.add("hidden");
    }

    document.getElementById("successBox").classList.remove("hidden");
}

/* UI FEATURES */

function closeSuccess(){
    document.getElementById("successBox").classList.add("hidden");
}

function toggleView(){
    document.querySelector(".roles").classList.toggle("hidden");
    document.getElementById("compareView").classList.toggle("hidden");
}

function toggleTheme(){
    document.body.classList.toggle("light");
}

/* FAQ TOGGLE FEATURE */
function toggleFaq(btn) {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    
    if (item.classList.contains('open')) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
    } else {
        // Close others
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            openItem.classList.remove('open');
            openItem.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 30 + "px"; // 30 for padding
    }
}

/* PREMIUM CANVAS PARTICLES */
function initParticles() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.r = Math.random() * 1.5 + 0.5;
            this.dx = (Math.random() - 0.5) * 0.5;
            this.dy = (Math.random() - 0.5) * 0.5;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < 0 || this.x > width) this.dx = -this.dx;
            if (this.y < 0 || this.y > height) this.dy = -this.dy;
            this.draw();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(216, 180, 254, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.update());
        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener("DOMContentLoaded", initParticles);
