document.addEventListener("DOMContentLoaded", function () {

  const btnModals = document.querySelectorAll('.btn-modal')

  const modalForms = document.querySelectorAll('[data-modal-target]')

  if (btnModals.length > 0 && modalForms.length > 0) {
    btnModals.forEach(btn => {

      btn.addEventListener("click", () => {

        let dataModalPath = btn.getAttribute('data-modal-path')

        if (document.querySelector(`.graph-modal__container[data-modal-target="${dataModalPath}"]`)) {

          const modal = document.querySelector(`.graph-modal__container[data-modal-target="${dataModalPath}"]`)

          document.querySelector("body").classList.add("disable-scroll")
          document.querySelector("body").style.setProperty("padding-right", '17px')

          document.querySelector('.graph-modal').classList.add("is-open")

          modal.classList.add("graph-modal-open")

          modal.querySelector('.js-modal-close').addEventListener('click', () => {
            modal.classList.remove("graph-modal-open")
            modal.classList.remove("animate-open")
            modal.classList.remove("fade")
            document.querySelector(".graph-modal").classList.remove("is-open")
            document.querySelector("body").classList.remove("disable-scroll")
            document.querySelector("body").style.removeProperty("padding-right")
          })
        }
      })
    })
  }

})
