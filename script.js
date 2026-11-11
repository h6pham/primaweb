
/* =========================================
   RANGKUMAN PRIMA
   PUBLIC READ ONLY SYSTEM
   OCEAN THEME
========================================= */


/* =========================================
   1. OWNER PROFILE
========================================= */

const profile = {
    name: "Prima Arjuna Thiof Aldi",
    major: "Mahasiswa",
    photo: "assets/foto-prima.jpeg"
};


/* =========================================
   2. PUBLIC NOTES DATABASE
========================================= */

// Masukkan semua rangkuman di bagian ini.
// Semua rangkuman akan ditampilkan kepada pengunjung.

const notes = [
    {
        id: 1,
        course: "Cyberpreneurship",
        title: "Pertemuan 1 - Pengenalan Cyberpreneurship",
        summary: `
            Masukkan rangkuman materi pertemuan pertama
            Cyberpreneurship di sini.

            Lu bebas menulis sepanjang yang diperlukan.
        `,
        createdAt: "2026-11-11"
    },

    {
        id: 2,
        course: "Cyberpreneurship",
        title: "Pertemuan 2 - Materi Berikutnya",
        summary: `
1. Pengertian Cyberpreneurship
Cyberpreneurship adalah kegiatan menjalankan bisnis secara online dengan memanfaatkan internet untuk memperoleh penghasilan. Seorang cyberpreneur biasanya menggunakan website, media sosial, dan berbagai tools digital untuk memasarkan produk atau jasa.

Googlepreneur adalah orang yang memanfaatkan layanan Google untuk menghasilkan uang, seperti Google AdSense, YouTube, Blogger, Google Ads, dan Google Analytics.
2. Rumus Sukses CTPM
CTPM merupakan empat tahapan penting dalam membangun bisnis online:
1. Content: Membuat konten yang menarik dan bermanfaat.
2. Traffic: Mendatangkan pengunjung ke website atau media sosial.
3. Presell: Memberikan ulasan atau rekomendasi produk agar calon pembeli tertarik.
4. Monetize: Menghasilkan uang melalui penjualan, iklan, atau afiliasi.
3. Langkah Menjadi Cyberpreneur
- Memiliki pola pikir bisnis dan motivasi yang kuat.
- Fokus pada satu atau dua jenis bisnis online.
- Memilih niche sesuai minat dan kebutuhan pasar.
- Menyusun rencana bisnis, mulai dari analisis pesaing hingga strategi pemasaran.
- Menerapkan tahapan CTPM secara konsisten.
4. Lima Model Bisnis Online
1. Menjual Produk Sendiri: Menjual barang, produk digital, atau layanan melalui internet.
2. Menjual Keahlian: Menawarkan jasa seperti desain grafis, penulisan, dan pembuatan website.
3. Affiliate Marketing: Mempromosikan produk orang lain dan memperoleh komisi dari hasilnya.
4. Contextual Advertising: Mendapatkan penghasilan dari iklan yang dipasang di website.
5. Site Flipping: Membeli, mengembangkan, atau menjual website dan aset digital yang memiliki nilai.
Kesimpulan
Cyberpreneurship merupakan peluang bisnis yang memanfaatkan teknologi internet untuk memperoleh penghasilan. Keberhasilannya membutuhkan strategi yang tepat, konsistensi, pemilihan model bisnis, serta penerapan rumus CTPM.
        `,
        createdAt: "2026-11-12"
    }
];


/* =========================================
   3. HELPER FUNCTIONS
========================================= */

// Mempermudah pemanggilan elemen HTML.

const $ = (id) => {
    return document.getElementById(id);
};


// Mengamankan teks sebelum ditampilkan ke HTML.

function escapeHTML(value = "") {

    return String(value).replace(/[&<>"']/g, (char) => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];

    });

}


// Format tanggal rangkuman.

function formatDate(date) {

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "TANGGAL TIDAK DIKETAHUI";
    }

    return parsedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


/* =========================================
   4. PROFILE RENDER
========================================= */

function renderProfile() {

    const profileName = profile.name || "Student Name";

    const profileMajor = profile.major || "Your Major / Campus";

    $("profileName").textContent = profileName;

    $("profileMajor").textContent = profileMajor;

    $("avatarInitial").textContent =
        profileName.trim().charAt(0).toUpperCase();

}


/* =========================================
   5. STATISTICS
========================================= */

function renderStatistics() {

    // Menghitung jumlah rangkuman.

    $("totalNotes").textContent = notes.length;


    // Menghitung jumlah mata kuliah unik.

    const uniqueCourses = new Set(

        notes.map((note) => {
            return note.course.trim().toLowerCase();
        })

    );

    $("totalCourses").textContent = uniqueCourses.size;


    // Menghitung jumlah file.

    const fileLabel = notes.length === 1
        ? "FILE"
        : "FILES";

    $("archiveCount").textContent =
        `${notes.length} ${fileLabel}`;

}


/* =========================================
   6. EMPTY STATE
========================================= */

function renderEmptyState(hasNotes) {

    const title = hasNotes
        ? "TIDAK ADA HASIL"
        : "ARSIP MASIH KOSONG";

    const description = hasNotes
        ? "Coba kata kunci pencarian lainnya."
        : "Belum ada rangkuman materi yang dipublikasikan.";

    $("notesList").innerHTML = `

        <div class="empty-state">

            <span>✳</span>

            <h3>${title}</h3>

            <p>${description}</p>

        </div>

    `;

}


/* =========================================
   7. NOTES RENDER
========================================= */

function renderNotes() {

    const query = $("searchInput")
        .value
        .toLowerCase()
        .trim();


    // Filter rangkuman berdasarkan pencarian.

    const filteredNotes = notes

        .filter((note) => {

            const searchableText = `

                ${note.course}

                ${note.title}

                ${note.summary}

            `.toLowerCase();

            return searchableText.includes(query);

        })


        // Urutkan dari tanggal terbaru.

        .sort((a, b) => {

            return new Date(b.createdAt) - new Date(a.createdAt);

        });


    // Perbarui statistik.

    renderStatistics();


    // Tampilkan kondisi arsip kosong.

    if (filteredNotes.length === 0) {

        renderEmptyState(notes.length > 0);

        return;

    }


    // Tampilkan seluruh rangkuman.

    $("notesList").innerHTML = filteredNotes

        .map((note) => {

            return `

                <article class="note-card">

                    <div class="note-top">

                        <div>

                            <span class="course-tag">

                                ${escapeHTML(note.course)}

                            </span>


                            <h3>

                                ${escapeHTML(note.title)}

                            </h3>

                        </div>

                    </div>


                    <div class="note-body">

                        ${escapeHTML(note.summary.trim())}

                    </div>


                    <div class="note-meta">

                        PUBLISHED

                        ${formatDate(note.createdAt)}

                    </div>

                </article>

            `;

        })

        .join("");

}


/* =========================================
   8. SEARCH FUNCTION
========================================= */

function initializeSearch() {

    const searchInput = $("searchInput");

    searchInput.addEventListener("input", () => {

        renderNotes();

    });

}


/* =========================================
   9. INITIALIZATION
========================================= */

function initializeWebsite() {

    // Tampilkan profil owner.

    renderProfile();
    const avatar = document.querySelector(".avatar");

    if (avatar && profile.photo) {
        avatar.style.backgroundImage = `url("${profile.photo}")`;
        avatar.style.backgroundSize = "cover";
        avatar.style.backgroundPosition = "center";
        avatar.textContent = "";
    }


    // Tampilkan arsip rangkuman.

    renderNotes();


    // Aktifkan pencarian.

    initializeSearch();

}


// Jalankan website.

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);
