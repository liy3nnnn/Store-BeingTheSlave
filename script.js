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