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
  // GENERATE PDF
  // =========================================================

  async function generatePortfolioPDF() {


    // =======================================================
    // CEK LIBRARY
    // =======================================================

    if (
      !window.html2canvas ||
      !window.jspdf
    ) {

      throw new Error(
        "Library PDF belum berhasil dimuat. " +
        "Periksa koneksi internet lalu coba lagi."
      );

    }


    const { jsPDF } =
      window.jspdf;



    // =======================================================
    // AMBIL PORTFOLIO
    // =======================================================

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
    // CLONE PORTFOLIO
    // =======================================================

    const clone =
      source.cloneNode(true);


    clone.classList.add(
      "pdf-export-mode"
    );



    // =======================================================
    // HAPUS ELEMENT INTERAKTIF
    // =======================================================

    clone.querySelectorAll(
      ".back-to-top, .cv-btn, .carousel-nav"
    ).forEach((el) => {

      el.remove();

    });



    // =======================================================
    // EXPERIENCE BUTTON
    // UBAH MENJADI BLOK STATIS
    // =======================================================

    clone.querySelectorAll(
      ".experience-item"
    ).forEach((el) => {


      const replacement =
        document.createElement(
          "div"
        );


      replacement.className =
        el.className +
        " pdf-experience-static";


      replacement.innerHTML =
        el.innerHTML;


      replacement.style.cursor =
        "default";


      replacement.style.pointerEvents =
        "none";


      replacement.style.display =
        "block";


      replacement.style.position =
        "relative";


      replacement.style.transform =
        "none";


      el.replaceWith(
        replacement
      );

    });



    // =======================================================
    // SEMUA CAROUSEL DI PDF
    // =======================================================
    //
    // Website:
    //     Carousel tetap normal.
    //
    // PDF:
    //     Semua item menjadi vertical.
    //
    // =======================================================

    const pdfCarousels =
      clone.querySelectorAll(
        ".carousel"
      );


    pdfCarousels.forEach(
      (carousel) => {


        // ---------------------------------------------------
        // MATIKAN MODE SLIDE BOOTSTRAP
        // ---------------------------------------------------

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



        // ---------------------------------------------------
        // NORMALKAN CAROUSEL
        // ---------------------------------------------------

        carousel.style.display =
          "block";


        carousel.style.position =
          "relative";


        carousel.style.width =
          "100%";


        carousel.style.height =
          "auto";


        carousel.style.minHeight =
          "0";


        carousel.style.maxHeight =
          "none";


        carousel.style.overflow =
          "visible";


        carousel.style.transform =
          "none";


        carousel.style.transition =
          "none";



        // ---------------------------------------------------
        // AMBIL CAROUSEL INNER
        // ---------------------------------------------------

        const inner =
          carousel.querySelector(
            ".carousel-inner"
          );


        if (!inner) {

          return;

        }



        // ---------------------------------------------------
        // NORMALKAN INNER
        // ---------------------------------------------------

        inner.style.display =
          "block";


        inner.style.position =
          "relative";


        inner.style.width =
          "100%";


        inner.style.height =
          "auto";


        inner.style.minHeight =
          "0";


        inner.style.maxHeight =
          "none";


        inner.style.overflow =
          "visible";


        inner.style.transform =
          "none";


        inner.style.transition =
          "none";



        // ---------------------------------------------------
        // AMBIL SEMUA ITEM
        // ---------------------------------------------------

        const items =
          Array.from(
            inner.querySelectorAll(
              ".carousel-item"
            )
          );



        // ---------------------------------------------------
        // JIKA ADA ITEM
        // ---------------------------------------------------

        items.forEach(
          (item, index) => {


            // -----------------------------------------------
            // HAPUS STATUS ACTIVE
            // -----------------------------------------------

            item.classList.remove(
              "active"
            );


            item.classList.add(
              "pdf-carousel-item"
            );



            // -----------------------------------------------
            // PAKSA TAMPIL
            // -----------------------------------------------

            item.style.display =
              "block";


            item.style.position =
              "relative";


            item.style.left =
              "auto";


            item.style.right =
              "auto";


            item.style.top =
              "auto";


            item.style.bottom =
              "auto";


            item.style.float =
              "none";


            item.style.clear =
              "both";


            item.style.width =
              "100%";


            item.style.height =
              "auto";


            item.style.minHeight =
              "0";


            item.style.maxHeight =
              "none";


            item.style.margin =
              "0 0 18px 0";


            item.style.padding =
              "0";


            item.style.opacity =
              "1";


            item.style.visibility =
              "visible";


            item.style.transform =
              "none";


            item.style.transition =
              "none";


            item.style.animation =
              "none";


            item.style.pageBreakInside =
              "avoid";


            item.style.breakInside =
              "avoid";



            // -----------------------------------------------
            // NORMALKAN SEMUA CHILD
            // -----------------------------------------------

            item.querySelectorAll(
              "*"
            ).forEach(
              (child) => {


                child.style.transform =
                  "none";


                child.style.transition =
                  "none";


                child.style.animation =
                  "none";


              }
            );



            // -----------------------------------------------
            // LABEL TESTIMONI
            // -----------------------------------------------

            const label =
              document.createElement(
                "div"
              );


            label.className =
              "pdf-carousel-label";


            label.textContent =
              `Testimoni ${index + 1}`;


            label.style.display =
              "block";


            label.style.position =
              "relative";


            label.style.width =
              "100%";


            label.style.height =
              "auto";


            label.style.margin =
              "0 0 7px 0";


            label.style.padding =
              "0";


            label.style.fontSize =
              "10px";


            label.style.fontWeight =
              "700";


            label.style.letterSpacing =
              "1px";


            label.style.lineHeight =
              "1.4";


            label.style.opacity =
              "0.65";


            label.style.transform =
              "none";


            // -----------------------------------------------
            // MASUKKAN LABEL
            // -----------------------------------------------

            item.insertBefore(
              label,
              item.firstChild
            );

          }
        );



        // ---------------------------------------------------
        // HAPUS KONTROL LAIN
        // ---------------------------------------------------

        inner.querySelectorAll(
          ".carousel-control-prev, " +
          ".carousel-control-next, " +
          ".carousel-indicators"
        ).forEach(
          (el) => {

            el.remove();

          }
        );

      }
    );



    // =======================================================
    // CSS KHUSUS PDF
    // =======================================================

    const pdfStyle =
      document.createElement(
        "style"
      );


    pdfStyle.textContent = `

      /* =================================================
         PDF EXPORT
         ================================================= */

      .pdf-export-mode {

        width: 1100px !important;

        max-width: 1100px !important;

        min-width: 1100px !important;

        height: auto !important;

        min-height: 0 !important;

        max-height: none !important;

        overflow: visible !important;

        box-sizing: border-box !important;

      }



      /* =================================================
         MATIKAN ANIMASI
         ================================================= */

      .pdf-export-mode *,
      .pdf-export-mode *::before,
      .pdf-export-mode *::after {

        animation: none !important;

        transition: none !important;

      }



      /* =================================================
         CAROUSEL
         ================================================= */

      .pdf-export-mode .carousel {

        display: block !important;

        position: relative !important;

        width: 100% !important;

        height: auto !important;

        min-height: 0 !important;

        max-height: none !important;

        overflow: visible !important;

        transform: none !important;

        transition: none !important;

      }



      /* =================================================
         CAROUSEL INNER
         ================================================= */

      .pdf-export-mode .carousel-inner {

        display: block !important;

        position: relative !important;

        width: 100% !important;

        height: auto !important;

        min-height: 0 !important;

        max-height: none !important;

        overflow: visible !important;

        transform: none !important;

        transition: none !important;

      }



      /* =================================================
         SEMUA ITEM
         ================================================= */

      .pdf-export-mode .carousel-item,
      .pdf-export-mode .carousel-item.active {

        display: block !important;

        position: relative !important;

        left: auto !important;

        right: auto !important;

        top: auto !important;

        bottom: auto !important;

        float: none !important;

        clear: both !important;

        width: 100% !important;

        height: auto !important;

        min-height: 0 !important;

        max-height: none !important;

        margin: 0 0 18px 0 !important;

        padding: 0 !important;

        opacity: 1 !important;

        visibility: visible !important;

        transform: none !important;

        transition: none !important;

        animation: none !important;

        page-break-inside: avoid !important;

        break-inside: avoid !important;

      }



      /* =================================================
         LABEL
         ================================================= */

      .pdf-export-mode .pdf-carousel-label {

        display: block !important;

        position: relative !important;

        width: 100% !important;

        height: auto !important;

        clear: both !important;

        transform: none !important;

      }



      /* =================================================
         EXPERIENCE
         ================================================= */

      .pdf-export-mode .experience-item {

        display: block !important;

        position: relative !important;

        transform: none !important;

        opacity: 1 !important;

        visibility: visible !important;

      }



      /* =================================================
         FOOTER
         ================================================= */

      .pdf-export-mode footer {

        page-break-inside: avoid !important;

        break-inside: avoid !important;

      }



      /* =================================================
         OWNER CONTACT
         ================================================= */

      .pdf-owner-contact {

        width: 100%;

        box-sizing: border-box;

        padding: 10px 20px;

        margin: 0 0 0px 0;

        background: #ffffff;

        border: 1px solid #dddddd;

        border-radius: 12px;

        page-break-inside: avoid;

        break-inside: avoid;

      }



      .pdf-owner-title {

        font-size: 13px;

        font-weight: 700;

        letter-spacing: 1px;

        margin-bottom: 5px;

      }



      .pdf-owner-row {

        display: flex;

        align-items: center;

        gap: 8px;

        margin-bottom: 0px;

        font-size: 11px;

      }



      .pdf-owner-row i {

        width: 18px;

        min-width: 18px;

        text-align: center;

      }



      .pdf-owner-date {

        margin-top: 0px;

        padding-top: 5px;

        border-top: 1px solid #eeeeee;

        font-size: 9px;

        opacity: 0.7;

      }

    `;



    // -------------------------------------------------------
    // MASUKKAN STYLE KE CLONE
    // -------------------------------------------------------

    clone.prepend(
      pdfStyle
    );



    // =======================================================
    // HAPUS ID AGAR TIDAK KONFLIK
    // =======================================================

    clone.querySelectorAll(
      "[id]"
    ).forEach((el) => {


      if (
        el.id !== "year"
      ) {

        el.removeAttribute(
          "id"
        );

      }

    });



    // =======================================================
    // INFORMASI PEMILIK
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


      <div class="pdf-owner-row">

        <i class="fa-solid fa-envelope"></i>

        <span>

          <strong>
            Email:
          </strong>

          ${escapeHtml(
            OWNER_EMAIL
          )}

        </span>

      </div>


      <div class="pdf-owner-row">

        <i class="fa-brands fa-whatsapp"></i>

        <span>

          <strong>
            WhatsApp:
          </strong>

          ${escapeHtml(
            OWNER_PHONE
          )}

        </span>

      </div>


      <div class="pdf-owner-date">

        Generated:

        ${new Date().toLocaleString(
          "id-ID",
          {
            dateStyle:
              "long",

            timeStyle:
              "short"
          }
        )}

      </div>

    `;



    // =======================================================
    // MASUKKAN OWNER CONTACT KE PALING ATAS
    // =======================================================

    clone.insertBefore(
      ownerContact,
      clone.firstChild
    );



    // =======================================================
    // HOLDER
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
      "1100px";


    holder.style.height =
      "auto";


    holder.style.minHeight =
      "0";


    holder.style.background =
      "#ffffff";


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
      // TUNGGU LAYOUT SELESAI
      // =====================================================

      await new Promise(
        (resolve) => {

          requestAnimationFrame(
            () => {

              requestAnimationFrame(
                () => {

                  resolve();

                }
              );

            }
          );

        }
      );



      // =====================================================
      // RENDER HTML KE CANVAS
      // =====================================================

      const canvas =
        await html2canvas(
          clone,
          {

            scale:
              1.5,

            useCORS:
              true,

            allowTaint:
              false,

            backgroundColor:
              "#ffffff",

            logging:
              false,

            windowWidth:
              1100,

            imageTimeout:
              15000

          }
        );


// =====================================================
// BUAT PDF F4 / FOLIO
// =====================================================

const pdf =
  new jsPDF(
    {
      orientation:
        "portrait",

      unit:
        "mm",

      format:
        [215, 330],

      compress:
        true
    }
  );


// =====================================================
// UKURAN F4 / FOLIO
// =====================================================

const pageWidth =
  215;


const pageHeight =
  330;


const margin =
  8;


const usableWidth =
  pageWidth -
  (margin * 2);


const usableHeight =
  pageHeight -
  (margin * 2);


// =====================================================
// KONVERSI PIXEL -> MM
// =====================================================

const pxPerMm =
  canvas.width /
  usableWidth;


const pageCanvasHeight =
  Math.floor(
    usableHeight *
    pxPerMm
  );


// =====================================================
// VARIABEL HALAMAN
// =====================================================

let offsetY =
  0;


let pageNumber =
  0;


// =====================================================
// BAGI CANVAS MENJADI BEBERAPA HALAMAN F4
// =====================================================

while (
  offsetY <
  canvas.height
) {

  const sliceHeight =
    Math.min(
      pageCanvasHeight,
      canvas.height -
      offsetY
    );


  const pageCanvas =
    document.createElement(
      "canvas"
    );


  pageCanvas.width =
    canvas.width;


  pageCanvas.height =
    sliceHeight;


  const ctx =
    pageCanvas.getContext(
      "2d"
    );


  ctx.fillStyle =
    "#ffffff";


  ctx.fillRect(
    0,
    0,
    pageCanvas.width,
    pageCanvas.height
  );


  ctx.drawImage(

    canvas,

    0,
    offsetY,

    canvas.width,
    sliceHeight,

    0,
    0,

    canvas.width,
    sliceHeight

  );


  const imageData =
    pageCanvas.toDataURL(
      "image/jpeg",
      0.85
    );


  const renderedHeight =
    sliceHeight /
    pxPerMm;


  if (
    pageNumber > 0
  ) {

    pdf.addPage();

  }


  pdf.addImage(

    imageData,

    "JPEG",

    margin,

    margin,

    usableWidth,

    renderedHeight,

    undefined,

    "FAST"

  );


  offsetY +=
    sliceHeight;


  pageNumber++;

}
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
      // HAPUS CLONE
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
      async (e) => {


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


        catch (error) {


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
        progress + "%";

    }



    if (
      backToTop
    ) {

      backToTop.classList.toggle(
        "is-visible",

        window.scrollY > 450
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
          (bar) => {


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
      (e) => {


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
      (e) => {


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
          Math.abs(diff) > 50
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
      (item) => {


        item.addEventListener(
          "click",
          () => {


            // ---------------------------------------------
            // HAPUS ACTIVE ITEM LAIN
            // ---------------------------------------------

            experienceItems.forEach(
              (el) => {


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
          (el) => {


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