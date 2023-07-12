import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <div className={classes.overlay} onClick={props.onCloseModal} />
      <div className={classes.content}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.body}>{props.children}</div>
        <footer className={classes.footer}>
          <button className={classes.button} onClick={props.onCloseModal}>
            Close
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById('overlay-root') // Update this with the appropriate root element
  );
};

export default Modal;
