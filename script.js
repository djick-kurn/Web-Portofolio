document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  // =========================================================
  // REQUEST CV -> DIRECT DOWNLOAD PDF
  // =========================================================

  const downloadCVBtn =
    document.getElementById("downloadCV");


  // ---------------------------------------------------------
  // DATA PEMILIK PORTOFOLIO
  // ---------------------------------------------------------

  const OWNER_EMAIL =
    "kurniaji.0312@gmail.com";

  const OWNER_PHONE =
    "087782292287";


  // =========================================================
  // ESCAPE HTML
  // =========================================================

  function escapeHtml(value) {

    const div =
      document.createElement("div");

    div.textContent =
      value;

    return div.innerHTML;

  }


  // =========================================================
  // GENERATE PDF - F4 1 HALAMAN
  // =========================================================

  async function generatePortfolioPDF() {

    if (
      !window.html2canvas ||
      !window.jspdf
    ) {

      throw new Error(
        "Library PDF belum berhasil dimuat. Periksa koneksi internet lalu coba lagi."
      );

    }


    const { jsPDF } =
      window.jspdf;


    const source =
      document.querySelector(
        ".portfolio-card"
      );


    if (!source) {

      throw new Error(
        "Konten portofolio tidak ditemukan."
      );

    }


    // =======================================================
    // UKURAN F4 / FOLIO INDONESIA
    // =======================================================

    const pageWidth =
      215;

    const pageHeight =
      330;


    // =======================================================
    // MARGIN 0,5 CM
    // =======================================================

    const marginX =
      5;

    const marginTop =
      5;

    const marginBottom =
      5;


    const usableWidth =
      pageWidth -
      (marginX * 2);

    const usableHeight =
      pageHeight -
      marginTop -
      marginBottom;


    // =======================================================
    // KONVERSI PX <-> MM
    // =======================================================

    const PX_PER_MM =
      96 / 25.4;

    const usableHeightPx =
      usableHeight *
      PX_PER_MM;


    const targetAspect =
      usableHeight /
      usableWidth;


    // =======================================================
    // CLONE KHUSUS PDF
    // WEBSITE ASLI TIDAK DIUBAH
    // =======================================================

    const clone =
      source.cloneNode(true);

    clone.classList.add(
      "pdf-export-mode"
    );


    // =======================================================
    // HAPUS ELEMEN YANG MEMANG TIDAK DIPERLUKAN DI PDF
    // =======================================================

    clone.querySelectorAll(
      ".back-to-top, .cv-btn, .carousel-nav"
    ).forEach(
      el => el.remove()
    );


    // =======================================================
    // PENGALAMAN
    // PERTAHANKAN SEMUA
    // =======================================================

    clone.querySelectorAll(
      ".experience-item"
    ).forEach(
      el => {

        const replacement =
          document.createElement("div");

        replacement.className =
          el.className +
          " pdf-experience-static";

        replacement.innerHTML =
          el.innerHTML;

        replacement.style.cursor =
          "default";

        replacement.style.pointerEvents =
          "none";

        replacement.style.transform =
          "none";

        replacement.style.display =
          "grid";

        replacement.style.position =
          "relative";

        replacement.style.height =
          "auto";

        replacement.style.minHeight =
          "0";

        replacement.style.maxHeight =
          "none";

        el.replaceWith(
          replacement
        );

      }
    );


    // =======================================================
    // CAROUSEL
    // SEMUA TESTIMONIAL TETAP MASUK
    // =======================================================

    clone.querySelectorAll(
      ".carousel"
    ).forEach(
      carousel => {

        carousel.classList.remove(
          "slide"
        );

        carousel.removeAttribute(
          "data-bs-ride"
        );

        carousel.removeAttribute(
          "data-bs-interval"
        );

        carousel.removeAttribute(
          "data-bs-wrap"
        );

        carousel.style.cssText +=
          ";display:block!important;" +
          "position:relative!important;" +
          "width:100%!important;" +
          "height:auto!important;" +
          "min-height:0!important;" +
          "max-height:none!important;" +
          "overflow:visible!important;" +
          "transform:none!important;" +
          "transition:none!important;" +
          "animation:none!important;";


        const inner =
          carousel.querySelector(
            ".carousel-inner"
          );


        if (!inner) return;


        inner.style.cssText +=
          ";display:block!important;" +
          "position:relative!important;" +
          "width:100%!important;" +
          "height:auto!important;" +
          "min-height:0!important;" +
          "max-height:none!important;" +
          "overflow:visible!important;" +
          "transform:none!important;" +
          "transition:none!important;" +
          "animation:none!important;";


        inner.querySelectorAll(
          ".carousel-control-prev," +
          ".carousel-control-next," +
          ".carousel-indicators"
        ).forEach(
          el => el.remove()
        );


        inner.querySelectorAll(
          ".carousel-item"
        ).forEach(
          (item, index) => {

            item.classList.remove(
              "active"
            );

            item.style.cssText +=
              ";display:block!important;" +
              "position:relative!important;" +
              "left:auto!important;" +
              "right:auto!important;" +
              "top:auto!important;" +
              "bottom:auto!important;" +
              "float:none!important;" +
              "width:100%!important;" +
              "height:auto!important;" +
              "min-height:0!important;" +
              "max-height:none!important;" +
              "margin:0 0 3px 0!important;" +
              "padding:0!important;" +
              "opacity:1!important;" +
              "visibility:visible!important;" +
              "transform:none!important;" +
              "transition:none!important;" +
              "animation:none!important;" +
              "break-inside:avoid!important;" +
              "page-break-inside:avoid!important;";


            item.querySelectorAll(
              "*"
            ).forEach(
              child => {

                child.style.transform =
                  "none";

                child.style.transition =
                  "none";

                child.style.animation =
                  "none";

              }
            );


            const label =
              document.createElement(
                "div"
              );

            label.className =
              "pdf-carousel-label";

            label.textContent =
              `Testimoni ${index + 1}`;

            item.insertBefore(
              label,
              item.firstChild
            );

          }
        );

      }
    );


    // =======================================================
    // HAPUS ID AGAR TIDAK BENTROK
    // =======================================================

    clone.querySelectorAll(
      "[id]"
    ).forEach(
      el => {

        if (
          el.id !== "year"
        ) {

          el.removeAttribute(
            "id"
          );

        }

      }
    );


    // =======================================================
    // INFORMASI KONTAK PEMILIK
    // =======================================================

    const ownerContact =
      document.createElement(
        "div"
      );


    ownerContact.className =
      "pdf-owner-contact";


    ownerContact.innerHTML = `

      <div class="pdf-owner-title">
        CONTACT INFORMATION
      </div>

      <div class="pdf-owner-inline">

        <span>
          <i class="fa-solid fa-envelope"></i>
          ${escapeHtml(OWNER_EMAIL)}
        </span>

        <span>
          <i class="fa-brands fa-whatsapp"></i>
          ${escapeHtml(OWNER_PHONE)}
        </span>

        <span>
          <i class="fa-regular fa-calendar"></i>

          ${new Date().toLocaleDateString(
            "id-ID",
            {
              day:
                "2-digit",

              month:
                "2-digit",

              year:
                "numeric"
            }
          )}

        </span>

      </div>

    `;


    clone.insertBefore(
      ownerContact,
      clone.firstChild
    );


    // =======================================================
    // CSS KHUSUS PDF
    // =======================================================

    const pdfStyle =
      document.createElement(
        "style"
      );


    pdfStyle.textContent = `

      /* ===================================================
         RESET UTAMA PDF
         =================================================== */

      .pdf-export-mode{

        width:
          var(--pdf-render-width,800px)!important;

        max-width:
          var(--pdf-render-width,800px)!important;

        min-width:
          var(--pdf-render-width,800px)!important;

        height:
          auto!important;

        min-height:
          0!important;

        max-height:
          none!important;

        margin:
          0!important;

        padding:
          0!important;

        overflow:
          visible!important;

        border-radius:
          0!important;

        box-shadow:
          none!important;

        border:
          0!important;

        background:
          #fff!important;

        box-sizing:
          border-box!important;

        transform:
          none!important;

        page-break-inside:
          avoid!important;

      }


      /* ===================================================
         HENTIKAN SEMUA ANIMASI
         =================================================== */

      .pdf-export-mode *,
      .pdf-export-mode *::before,
      .pdf-export-mode *::after{

        animation:
          none!important;

        transition:
          none!important;

        transform:
          none!important;

      }


      /* ===================================================
         HERO
         =================================================== */

      .pdf-export-mode .hero{

        padding:
          12px 30px 13px!important;

        margin:
          0!important;

      }


      .pdf-export-mode .topbar{

        margin-bottom:
          11px!important;

      }


      .pdf-export-mode .hero-grid{

        grid-template-columns:
          115px 1fr!important;

        gap:
          20px!important;

      }


      .pdf-export-mode .profile-ring{

        width:
          100px!important;

        height:
          100px!important;

        padding:
          4px!important;

      }


      .pdf-export-mode .availability{

        margin-top:
          4px!important;

        font-size:
          7px!important;

      }


      .pdf-export-mode .hero h1{

        font-size:
          35px!important;

        line-height:
          1!important;

        margin-bottom:
          3px!important;

      }


      .pdf-export-mode .lead{

        font-size:
          9px!important;

        line-height:
          1.3!important;

      }


      .pdf-export-mode .hero-actions{

        display:
          none!important;

      }


      /* ===================================================
         CONTENT
         =================================================== */

      .pdf-export-mode .content{

        padding:
          0 30px 0!important;

        margin:
          0!important;

      }


      /* ===================================================
         SECTION
         =================================================== */

      .pdf-export-mode .section{

        padding:
          7px 0!important;

        margin:
          0!important;

        border-bottom:
          1px solid #e4e7ec!important;

        page-break-inside:
          avoid!important;

      }


      .pdf-export-mode .section-heading{

        margin-bottom:
          5px!important;

        gap:
          7px!important;

      }


      .pdf-export-mode .section h2{

        font-size:
          17px!important;

        line-height:
          1.05!important;

      }


      .pdf-export-mode .section-intro{

        font-size:
          7.5px!important;

        margin-top:
          -2px!important;

        margin-bottom:
          5px!important;

      }


      /* ===================================================
         SKILLS
         =================================================== */

      .pdf-export-mode .skills-grid{

        gap:
          3px!important;

      }


      .pdf-export-mode .skill-card{

        grid-template-columns:
          22px 1fr!important;

        gap:
          5px!important;

        padding:
          4px 6px!important;

        border-radius:
          5px!important;

      }


      .pdf-export-mode .skill-icon{

        width:
          22px!important;

        height:
          22px!important;

        border-radius:
          4px!important;

        font-size:
          8px!important;

      }


      .pdf-export-mode .skill-card strong{

        font-size:
          7.5px!important;

      }


      .pdf-export-mode .skill-card small{

        font-size:
          6.5px!important;

      }


      .pdf-export-mode .skill-track{

        height:
          3px!important;

        margin-top:
          2px!important;

      }


      /* ===================================================
         EXPERIENCE
         =================================================== */

      .pdf-export-mode .experience-item,
      .pdf-export-mode .pdf-experience-static{

        grid-template-columns:
          12px 1fr auto!important;

        gap:
          6px!important;

        padding:
          3px 2px 3px 0!important;

        margin:
          0!important;

        min-height:
          0!important;

        height:
          auto!important;

        max-height:
          none!important;

        overflow:
          visible!important;

        page-break-inside:
          avoid!important;

      }


      .pdf-export-mode .timeline-dot{

        width:
          7px!important;

        height:
          7px!important;

      }


      .pdf-export-mode .experience-main{

        gap:
          1px!important;

      }


      .pdf-export-mode .experience-main strong{

        font-size:
          8px!important;

        line-height:
          1.15!important;

      }


      .pdf-export-mode .experience-main small,
      .pdf-export-mode .experience-period{

        font-size:
          7px!important;

        line-height:
          1.15!important;

      }


      .pdf-export-mode .experience-period i{

        font-size:
          6px!important;

      }


      /* ===================================================
         SPLIT SECTION
         =================================================== */

      .pdf-export-mode .split-section{

        gap:
          14px!important;

      }


      /* ===================================================
         ORGANISASI
         =================================================== */

      .pdf-export-mode .org-list div{

        padding:
          3px 0!important;

        grid-template-columns:
          minmax(0,1fr) 110px!important;

        gap:
          1px 6px!important;

      }


      .pdf-export-mode .org-list span,
      .pdf-export-mode .org-list small{

        font-size:
          6.5px!important;

      }


      .pdf-export-mode .org-list strong{

        font-size:
          7px!important;

      }


      /* ===================================================
         TESTIMONIAL
         =================================================== */

      .pdf-export-mode .testimonial-box{

        padding:
          6px 8px 5px!important;

        min-height:
          0!important;

        height:
          auto!important;

        max-height:
          none!important;

        border-radius:
          6px!important;

        overflow:
          visible!important;

        page-break-inside:
          avoid!important;

      }


      .pdf-export-mode .testimonial-box p{

        font-size:
          8px!important;

        line-height:
          1.2!important;

        margin:
          2px 0 3px!important;

      }


      .pdf-export-mode .testimonial-box span{

        font-size:
          6.5px!important;

      }


      .pdf-export-mode .pdf-carousel-label{

        display:
          block!important;

        font-size:
          6px!important;

        line-height:
          1.1!important;

        font-weight:
          700!important;

        letter-spacing:
          .35px!important;

        opacity:
          .6!important;

        margin:
          0 0 2px!important;

      }


      .pdf-export-mode .carousel-item{

        margin-bottom:
          2px!important;

        height:
          auto!important;

        min-height:
          0!important;

        max-height:
          none!important;

        overflow:
          visible!important;

      }


      /* ===================================================
         CONTACT INFORMATION
         =================================================== */

      .pdf-owner-contact{

        width:
          100%!important;

        box-sizing:
          border-box!important;

        padding:
          5px 30px!important;

        margin:
          0!important;

        background:
          #10233f!important;

        color:
          #fff!important;

        border:
          0!important;

        border-radius:
          0!important;

        line-height:
          1!important;

      }


      .pdf-owner-title{

        display:
          inline-block!important;

        font-size:
          6.5px!important;

        font-weight:
          700!important;

        letter-spacing:
          .6px!important;

        margin-right:
          10px!important;

      }


      .pdf-owner-inline{

        display:
          inline-flex!important;

        align-items:
          center!important;

        gap:
          12px!important;

        font-size:
          6.5px!important;

      }


      .pdf-owner-inline span{

        white-space:
          nowrap!important;

      }


      .pdf-owner-inline i{

        margin-right:
          2px!important;

      }


      /* ===================================================
         FOOTER
         =================================================== */

      .pdf-export-mode footer,
      .pdf-export-mode .footer{

        display:
          block!important;

        width:
          100%!important;

        height:
          auto!important;

        min-height:
          0!important;

        max-height:
          none!important;

        margin:
          0!important;

        padding:
          6px 30px!important;

        box-sizing:
          border-box!important;

        overflow:
          visible!important;

        page-break-inside:
          avoid!important;

      }


      .pdf-export-mode footer *,
      .pdf-export-mode .footer *{

        animation:
          none!important;

        transition:
          none!important;

        transform:
          none!important;

        max-height:
          none!important;

      }


      .pdf-export-mode footer p,
      .pdf-export-mode .footer p{

        margin:
          0!important;

        font-size:
          7px!important;

        line-height:
          1.25!important;

      }


      .pdf-export-mode footer small,
      .pdf-export-mode .footer small{

        font-size:
          6.5px!important;

        line-height:
          1.2!important;

      }


      .pdf-export-mode footer h1,
      .pdf-export-mode footer h2,
      .pdf-export-mode footer h3,
      .pdf-export-mode footer h4,
      .pdf-export-mode footer h5,
      .pdf-export-mode footer h6,
      .pdf-export-mode .footer h1,
      .pdf-export-mode .footer h2,
      .pdf-export-mode .footer h3,
      .pdf-export-mode .footer h4,
      .pdf-export-mode .footer h5,
      .pdf-export-mode .footer h6{

        margin:
          0!important;

      }


      /* ===================================================
         CEGAH ELEMEN TIDAK TERLIHAT KARENA HEIGHT FIXED
         =================================================== */

      .pdf-export-mode .row,
      .pdf-export-mode .col,
      .pdf-export-mode [class*="col-"]{

        min-height:
          0!important;

      }


      .pdf-export-mode img{

        max-width:
          100%!important;

      }

    `;


    clone.prepend(
      pdfStyle
    );


    // =======================================================
    // HOLDER DI LUAR VIEWPORT
    // =======================================================

    const holder =
      document.createElement(
        "div"
      );


    holder.style.position =
      "fixed";

    holder.style.left =
      "-100000px";

    holder.style.top =
      "0";

    holder.style.width =
      "800px";

    holder.style.height =
      "auto";

    holder.style.background =
      "#fff";

    holder.style.padding =
      "0";

    holder.style.margin =
      "0";

    holder.style.zIndex =
      "-1";

    holder.style.overflow =
      "visible";


    holder.appendChild(
      clone
    );


    document.body.appendChild(
      holder
    );


    try {

      // =====================================================
      // TUNGGU LAYOUT
      // =====================================================

      await new Promise(
        resolve => {

          requestAnimationFrame(
            () => {

              requestAnimationFrame(
                resolve
              );

            }
          );

        }
      );


      // =====================================================
      // TUNGGU FONT
      // =====================================================

      if (
        document.fonts &&
        document.fonts.ready
      ) {

        await document.fonts.ready;

      }


      // =====================================================
      // TUNGGU GAMBAR
      // =====================================================

      await Promise.all(

        Array.from(
          clone.querySelectorAll(
            "img"
          )
        ).map(
          img => {

            if (
              img.complete
            ) {

              return Promise.resolve();

            }

            return new Promise(
              resolve => {

                img.onload =
                  resolve;

                img.onerror =
                  resolve;

              }
            );

          }
        )

      );


      // =====================================================
      // AUTO-FIT F4 PRESISI
      //
      // Mencari ukuran render yang:
      // - tidak melebihi tinggi area F4
      // - mempertahankan proporsi
      // - paling mendekati rasio area cetak
      // - meminimalkan space kosong
      // =====================================================

      let bestWidth =
        800;

      let bestHeight =
        Infinity;

      let bestScore =
        Infinity;


      // =====================================================
      // FUNGSI TUNGGU LAYOUT
      // =====================================================

      async function waitForLayout() {

        await new Promise(
          resolve => {

            requestAnimationFrame(
              () => {

                requestAnimationFrame(
                  resolve
                );

              }
            );

          }
        );

      }


      // =====================================================
      // FUNGSI UKUR
      // =====================================================

      async function measureWidth(
        width
      ) {

        clone.style.setProperty(
          "--pdf-render-width",
          `${width}px`
        );

        holder.style.width =
          `${width}px`;

        await waitForLayout();

        const rect =
          clone.getBoundingClientRect();

        return {

          width:
            rect.width,

          height:
            rect.height,

          aspect:
            rect.height /
            Math.max(
              1,
              rect.width
            )

        };

      }


      // =====================================================
      // EVALUASI WIDTH
      // =====================================================

      async function evaluateWidth(
        width
      ) {

        const result =
          await measureWidth(
            width
          );


        // Tidak boleh melebihi area F4
        if (
          result.height >
          usableHeightPx
        ) {

          return;

        }


        const aspectDifference =
          Math.abs(
            Math.log(
              result.aspect /
              targetAspect
            )
          );


        /*
         * Semakin dekat rasio dengan area F4,
         * semakin kecil score.
         */

        const score =
          aspectDifference +
          (
            0.000001 /
            Math.max(
              1,
              result.width
            )
          );


        if (
          score <
          bestScore
        ) {

          bestScore =
            score;

          bestWidth =
            width;

          bestHeight =
            result.height;

        }

      }


      // =====================================================
      // CANDIDATE WIDTH
      // =====================================================

      const candidates = [];


      for (
        let width = 350;
        width <= 1200;
        width += 25
      ) {

        candidates.push(
          width
        );

      }


      candidates.push(
        400,
        450,
        500,
        550,
        600,
        650,
        700,
        750,
        800,
        850,
        900,
        950,
        1000,
        1050,
        1100,
        1150,
        1200
      );


      for (
        const width of
        candidates
      ) {

        await evaluateWidth(
          width
        );

      }


      // =====================================================
      // FALLBACK
      //
      // Jika seluruh kandidat terlalu tinggi,
      // cari ukuran yang pasti muat.
      // =====================================================

      if (
        bestHeight ===
        Infinity
      ) {

        let low =
          250;

        let high =
          1200;

        let fallbackWidth =
          low;


        for (
          let i = 0;
          i < 18;
          i++
        ) {

          const mid =
            (
              low +
              high
            ) / 2;


          const result =
            await measureWidth(
              mid
            );


          if (
            result.height <=
            usableHeightPx
          ) {

            fallbackWidth =
              mid;

            low =
              mid;

          }

          else {

            high =
              mid;

          }

        }


        const fallback =
          await measureWidth(
            fallbackWidth
          );


        bestWidth =
          fallback.width;

        bestHeight =
          fallback.height;

      }


      // =====================================================
      // WIDTH FINAL
      // =====================================================

      clone.style.setProperty(
        "--pdf-render-width",
        `${bestWidth}px`
      );


      holder.style.width =
        `${bestWidth}px`;


      await waitForLayout();


      // =====================================================
      // UKUR FINAL
      // =====================================================

      const finalRect =
        clone.getBoundingClientRect();


      const finalWidth =
        finalRect.width;


      const finalHeight =
        finalRect.height;


      // =====================================================
      // HTML2CANVAS
      // =====================================================

      const canvas =
        await html2canvas(
          clone,
          {

            scale:
              2,

            useCORS:
              true,

            allowTaint:
              false,

            backgroundColor:
              "#ffffff",

            logging:
              false,

            windowWidth:
              Math.ceil(
                finalWidth
              ),

            windowHeight:
              Math.ceil(
                finalHeight
              ),

            imageTimeout:
              15000,

            scrollX:
              0,

            scrollY:
              0

          }
        );


      // =====================================================
      // BUAT PDF F4
      // =====================================================

      const pdf =
        new jsPDF(
          {

            orientation:
              "portrait",

            unit:
              "mm",

            format:
              [
                pageWidth,
                pageHeight
              ],

            compress:
              true

          }
        );


      // =====================================================
      // RASIO CANVAS
      // =====================================================

      const imageRatio =
        canvas.height /
        canvas.width;


      // =====================================================
      // FIT KE AREA CETAK F4
      // =====================================================

      let renderWidth =
        usableWidth;


      let renderHeight =
        renderWidth *
        imageRatio;


      // =====================================================
      // JIKA TERLALU TINGGI
      // FIT KE TINGGI
      // =====================================================

      if (
        renderHeight >
        usableHeight
      ) {

        renderHeight =
          usableHeight;

        renderWidth =
          renderHeight /
          imageRatio;

      }


      // =====================================================
      // PENGAMAN LEBAR
      // =====================================================

      if (
        renderWidth >
        usableWidth
      ) {

        renderWidth =
          usableWidth;

        renderHeight =
          renderWidth *
          imageRatio;

      }


      // =====================================================
      // PENGAMAN TINGGI
      // =====================================================

      if (
        renderHeight >
        usableHeight
      ) {

        renderHeight =
          usableHeight;

        renderWidth =
          renderHeight /
          imageRatio;

      }


      // =====================================================
      // POSISI HORIZONTAL SIMETRIS
      // =====================================================

      const x =
        marginX +
        (
          usableWidth -
          renderWidth
        ) / 2;


      // =====================================================
      // POSISI VERTIKAL SIMETRIS
      //
      // Space yang tersisa dibagi rata antara
      // bagian atas dan bawah.
      // =====================================================

      const y =
        marginTop +
        Math.max(
          0,
          (
            usableHeight -
            renderHeight
          ) / 2
        );


      // =====================================================
      // TAMBAHKAN GAMBAR KE PDF
      // =====================================================

      pdf.addImage(

        canvas.toDataURL(
          "image/jpeg",
          0.92
        ),

        "JPEG",

        x,

        y,

        renderWidth,

        renderHeight,

        undefined,

        "MEDIUM"

      );


      // =====================================================
      // NAMA FILE
      // =====================================================

      const today =
        new Date()
          .toISOString()
          .slice(
            0,
            10
          );


      pdf.save(
        `Portfolio_Kurniaji_${today}.pdf`
      );

    }


    finally {

      // =====================================================
      // BERSIHKAN HOLDER
      // WEBSITE ASLI TETAP UTUH
      // =====================================================

      holder.remove();

    }

  }


  // =========================================================
  // TOMBOL REQUEST CV
  // =========================================================

  if (
    downloadCVBtn
  ) {

    downloadCVBtn.addEventListener(
      "click",
      async e => {

        e.preventDefault();


        // ---------------------------------------------------
        // SIMPAN TEXT ASLI
        // ---------------------------------------------------

        const originalText =
          downloadCVBtn.innerHTML;


        // ---------------------------------------------------
        // DISABLE BUTTON
        // ---------------------------------------------------

        downloadCVBtn.classList.add(
          "disabled"
        );


        downloadCVBtn.style.pointerEvents =
          "none";


        // ---------------------------------------------------
        // LOADING
        // ---------------------------------------------------

        downloadCVBtn.innerHTML = `

          <i class="fa-solid fa-spinner fa-spin"></i>

          Menyiapkan PDF...

        `;


        try {

          // -------------------------------------------------
          // GENERATE PDF
          // -------------------------------------------------

          await generatePortfolioPDF();

        }


        catch (
          error
        ) {

          console.error(
            "PDF Error:",
            error
          );


          alert(

            "PDF belum dapat dibuat. " +

            (
              error.message ||
              "Silakan coba lagi."
            )

          );

        }


        finally {

          // -------------------------------------------------
          // KEMBALIKAN TOMBOL
          // -------------------------------------------------

          downloadCVBtn.classList.remove(
            "disabled"
          );


          downloadCVBtn.style.pointerEvents =
            "";


          downloadCVBtn.innerHTML =
            originalText;

        }

      }
    );

  }


  // =========================================================
  // DATE & TIME
  // =========================================================

  const dateEl =
    document.getElementById(
      "current-date"
    );


  const timeEl =
    document.getElementById(
      "current-time"
    );


  function updateDateTime() {

    const now =
      new Date();


    if (
      dateEl
    ) {

      dateEl.textContent =
        now.toLocaleDateString(
          "id-ID",
          {

            weekday:
              "long",

            day:
              "numeric",

            month:
              "long",

            year:
              "numeric"

          }
        );

    }


    if (
      timeEl
    ) {

      timeEl.textContent =
        now.toLocaleTimeString(
          "id-ID",
          {

            hour:
              "2-digit",

            minute:
              "2-digit",

            second:
              "2-digit",

            hour12:
              false

          }
        );

    }

  }


  updateDateTime();


  window.setInterval(
    updateDateTime,
    1000
  );


  // =========================================================
  // SCROLL PROGRESS + BACK TO TOP
  // =========================================================

  const progressBar =
    document.querySelector(
      "#scrollProgress span"
    );


  const backToTop =
    document.getElementById(
      "backToTop"
    );


  function updateScrollUI() {

    const doc =
      document.documentElement;


    const maxScroll =
      Math.max(
        1,
        doc.scrollHeight -
        window.innerHeight
      );


    const progress =
      Math.min(
        100,
        Math.max(
          0,
          (
            window.scrollY /
            maxScroll
          ) * 100
        )
      );


    if (
      progressBar
    ) {

      progressBar.style.width =
        progress +
        "%";

    }


    if (
      backToTop
    ) {

      backToTop.classList.toggle(
        "is-visible",
        window.scrollY >
        450
      );

    }

  }


  let scrollTicking =
    false;


  window.addEventListener(
    "scroll",
    () => {

      if (
        scrollTicking
      ) {

        return;

      }


      scrollTicking =
        true;


      window.requestAnimationFrame(
        () => {

          updateScrollUI();


          scrollTicking =
            false;

        }
      );

    },
    {
      passive:
        true
    }
  );


  updateScrollUI();


  // =========================================================
  // BACK TO TOP
  // =========================================================

  if (
    backToTop
  ) {

    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo(
          {

            top:
              0,

            behavior:
              "smooth"

          }
        );

      }
    );

  }


  // =========================================================
  // SKILL ANIMATION
  // =========================================================

  const skillBars =
    document.querySelectorAll(
      ".skill-track span"
    );


  if (
    skillBars.length
  ) {

    const revealSkills =
      () => {

        skillBars.forEach(
          bar => {

            bar.classList.add(
              "is-visible"
            );

          }
        );

      };


    if (
      "IntersectionObserver"
      in window
    ) {

      const observer =
        new IntersectionObserver(
          (
            entries,
            obs
          ) => {

            if (
              entries.some(
                entry =>
                  entry.isIntersecting
              )
            ) {

              revealSkills();

              obs.disconnect();

            }

          },
          {

            threshold:
              0.15

          }
        );


      const target =
        document.querySelector(
          ".skills-grid"
        ) ||
        skillBars[0];


      observer.observe(
        target
      );

    }


    else {

      revealSkills();

    }

  }


  // =========================================================
  // TESTIMONIAL CAROUSEL
  // =========================================================

  const carousel =
    document.querySelector(
      "#carouselTestimoni"
    );


  if (
    carousel &&
    typeof bootstrap !==
    "undefined"
  ) {

    const bsCarousel =
      bootstrap.Carousel
        .getOrCreateInstance(
          carousel,
          {

            interval:
              false,

            ride:
              false,

            touch:
              true,

            wrap:
              true

          }
        );


    let autoSlideInterval =
      null;


    let touchStartX =
      0;


    let touchEndX =
      0;


    // -------------------------------------------------------
    // START AUTO SLIDE
    // -------------------------------------------------------

    const start =
      () => {

        clearInterval(
          autoSlideInterval
        );


        autoSlideInterval =
          window.setInterval(
            () => {

              bsCarousel.next();

            },
            4500
          );

      };


    // -------------------------------------------------------
    // STOP AUTO SLIDE
    // -------------------------------------------------------

    const stop =
      () => {

        clearInterval(
          autoSlideInterval
        );

      };


    // -------------------------------------------------------
    // MOUSE ENTER
    // -------------------------------------------------------

    carousel.addEventListener(
      "mouseenter",
      stop
    );


    // -------------------------------------------------------
    // MOUSE LEAVE
    // -------------------------------------------------------

    carousel.addEventListener(
      "mouseleave",
      start
    );


    // -------------------------------------------------------
    // FOCUS
    // -------------------------------------------------------

    carousel.addEventListener(
      "focusin",
      stop
    );


    carousel.addEventListener(
      "focusout",
      start
    );


    // =====================================================
    // TOUCH START
    // =====================================================

    carousel.addEventListener(
      "touchstart",
      e => {

        touchStartX =
          e.changedTouches[0]
            .clientX;


        touchEndX =
          touchStartX;


        stop();

      },
      {
        passive:
          true
      }
    );


    // =====================================================
    // TOUCH MOVE
    // =====================================================

    carousel.addEventListener(
      "touchmove",
      e => {

        touchEndX =
          e.changedTouches[0]
            .clientX;

      },
      {
        passive:
          true
      }
    );


    // =====================================================
    // TOUCH END
    // =====================================================

    carousel.addEventListener(
      "touchend",
      () => {

        const diff =
          touchStartX -
          touchEndX;


        if (
          Math.abs(diff) >
          50
        ) {

          diff > 0
            ? bsCarousel.next()
            : bsCarousel.prev();

        }


        start();

      },
      {
        passive:
          true
      }
    );


    // -------------------------------------------------------
    // START CAROUSEL
    // -------------------------------------------------------

    start();

  }


  // =========================================================
  // EXPERIENCE MODAL
  // =========================================================

  const experienceItems =
    document.querySelectorAll(
      ".experience-item"
    );


  const modalElement =
    document.getElementById(
      "experienceModal"
    );


  if (
    experienceItems.length &&
    modalElement &&
    typeof bootstrap !==
    "undefined"
  ) {

    const modal =
      bootstrap.Modal
        .getOrCreateInstance(
          modalElement,
          {

            backdrop:
              true,

            keyboard:
              true,

            focus:
              true

          }
        );


    const title =
      document.getElementById(
        "experienceModalTitle"
      );


    const period =
      document.getElementById(
        "experienceModalPeriod"
      );


    const description =
      document.getElementById(
        "experienceModalDescription"
      );


    // =====================================================
    // CLICK EXPERIENCE
    // =====================================================

    experienceItems.forEach(
      item => {

        item.addEventListener(
          "click",
          () => {

            // ---------------------------------------------
            // HAPUS ACTIVE ITEM LAIN
            // ---------------------------------------------

            experienceItems.forEach(
              el => {

                el.classList.remove(
                  "is-active"
                );

              }
            );


            // ---------------------------------------------
            // ACTIVE ITEM
            // ---------------------------------------------

            item.classList.add(
              "is-active"
            );


            // ---------------------------------------------
            // TITLE
            // ---------------------------------------------

            if (
              title
            ) {

              title.textContent =
                item.dataset.title ||
                "Pengalaman Kerja";

            }


            // ---------------------------------------------
            // PERIOD
            // ---------------------------------------------

            if (
              period
            ) {

              period.textContent =
                item.dataset.period
                  ? "Periode: " +
                    item.dataset.period
                  : "";

            }


            // ---------------------------------------------
            // DESCRIPTION
            // ---------------------------------------------

            if (
              description
            ) {

              description.textContent =
                item.dataset.description ||
                "Deskripsi pengalaman belum tersedia.";

            }


            // ---------------------------------------------
            // TAMPILKAN MODAL
            // ---------------------------------------------

            modal.show();

          }
        );

      }
    );


    // =====================================================
    // MODAL CLOSED
    // =====================================================

    modalElement.addEventListener(
      "hidden.bs.modal",
      () => {

        experienceItems.forEach(
          el => {

            el.classList.remove(
              "is-active"
            );

          }
        );

      }
    );

  }


  // =========================================================
  // CURRENT YEAR
  // =========================================================

  const year =
    document.getElementById(
      "year"
    );


  if (
    year
  ) {

    year.textContent =
      new Date().getFullYear();

  }

});
