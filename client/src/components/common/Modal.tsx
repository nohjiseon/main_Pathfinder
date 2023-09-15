import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState } from "../../atoms/atoms";

interface ModalProp {
  children: JSX.Element;
}

const StyledModal = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(26, 5, 6, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    position: relative;
    max-width: 37.5rem;
    background: #fff;
    padding: 24px 30px;
    box-shadow:
      0 1px 4px hsla(0, 0%, 0%, 0.09),
      0 3px 8px hsla(0, 0%, 0%, 0.09),
      0 4px 13px hsla(0, 0%, 0%, 0.13);
    border-radius: 8px;

    .close-button {
      position: absolute;
      padding: 16px;
      top: 10px;
      right: 7px;
      cursor: pointer;
    }

    h1 {
      font-size: 1.6875rem;
      color: #c22e32;
      margin: 0 0 1rem;
    }

    p {
      font-size: 0.8125rem;
      margin: 0 0 1.5rem;
    }

    button {
      padding: 0.8rem;
      border-radius: 6px;
      border: none;
    }

    .button-gap {
      display: flex;
      flex-flow: row;
      gap: 0.5rem;
    }

    .discard-action {
      background: #c22e32;
      color: #fff;

      &:hover {
        background: #ab262a;
      }
    }

    .cancel-action {
      background: transparent;

      &:hover {
        background: #f9fafa;
      }
    }
  }

  .consent-con {
    > strong {
      display: block;
      padding-bottom: 12px;
      margin-bottom: 24px;
      font-size: 24px;
      border-bottom: 1px solid #e7e7e7;
    }
  }

  .txt-conbox {
    height: 500px;
    overflow: auto;
    padding-right: 10px;
  }

  .txt-conbox::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .txt-conbox::-webkit-scrollbar-thumb {
    background-color: #d6d6d6;
    border-radius: 100px;
  }
  .txt-conbox::-webkit-scrollbar-track {
    border-radius: 100px;
    background-clip: padding-box;
    border: 1px solid transparent;
    background-color: #efefef;
  }

  .consent-intro {
    margin-bottom: 5px;
    line-height: 24px;
  }

  .consent-link {
    text-decoration: underline;
    cursor: pointer;
  }

  .consent-h1 {
    margin: 30px 0 20px 0;
    font-size: 20px;
    font-weight: 600;
  }

  .consent-h2 {
    margin-bottom: 10px;
    font-weight: 500;
  }

  .consent-h3 {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
  }

  li {
    text-indent: -18px;
    margin-left: 18px;
  }

  .consent-indent {
    margin: 2px 0 2px 37px;
  }
`;

const Modal = ({ children }: ModalProp): JSX.Element => {
  const setModal = useSetRecoilState(modalState);
  const modalIsOpen = useRecoilValue(modalState);

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) setModal(false);
  };

  const toggleModal = () => {
    setModal(!modalIsOpen);
  };

  return (
    <StyledModal onClick={closeModal}>
      <section className="modal">
        <div className="close-button" onClick={toggleModal}>
          <svg
            aria-hidden="true"
            className="svg-icon iconClearSm"
            width="24"
            height="24"
            viewBox="0 0 14 14"
          >
            <path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41Z"></path>
          </svg>
        </div>
        {children}
      </section>
    </StyledModal>
  );
};

export default Modal;
export {};
