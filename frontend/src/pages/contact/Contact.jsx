import React from 'react';

const Contact = () => {
  return (
    <section>
      <div className="section-header">
        <div className="container">
          <h2>Contactanos</h2>
          <p>¿Tienes alguna pregunta o necesitas más información? ¡Contáctanos hoy mismo! Estamos aquí para ayudarte en todo lo que necesites. Completa nuestro formulario de contacto o llámanos, y estaremos encantados de atenderte.</p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-home"></i>
              </div>

              <div className="contact-info-content">
                <h4>Address</h4>
                <p>4671 Sugar Camp Road,<br /> Owatonna, Minnesota, <br />55060</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-phone"></i>
              </div>

              <div className="contact-info-content">
                <h4>Phone</h4>
                <p>571-457-2321</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-envelope"></i>
              </div>

              <div className="contact-info-content">
                <h4>Email</h4>
                <p>ntamerrwael@mfano.ga</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form action="" id="contact-form">
              <h2>Envianos Un Mensaje</h2>
              <div className="input-box">
                <input type="text" required="true" name="" />
                <span>Nombre Completo</span>
              </div>

              <div className="input-box">
                <input type="email" required="true" name="" />
                <span>Email</span>
              </div>

              <div className="input-box">
                <textarea required="true" name=""></textarea>
                <span>Ingresa Tu Mensaje...</span>
              </div>

              <div className="input-box">
                <input type="submit" value="Send" name="" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;