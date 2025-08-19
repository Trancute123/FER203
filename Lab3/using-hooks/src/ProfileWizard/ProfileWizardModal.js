import React, {
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Nav,
  ProgressBar,
  Card,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import AboutForm from "./steps/AboutForm";
import AccountForm from "./steps/AccountForm";
import AddressForm from "./steps/AddressForm";
import { steps, reducer, initialState } from "./reducer";
import { validateAbout, validateAccount, validateAddress } from "./validators";

export default function ProfileWizardModal({ show, onHide }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showErrors, setShowErrors] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!show) {
      dispatch({ type: "RESET" });
      setShowErrors(false);
      setShowSummary(false);
    }
  }, [show]);

  const onFieldChange = useCallback((section, field, value) => {
    dispatch({ type: "SET_FIELD", section, field, value });
  }, []);

  const onFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => dispatch({ type: "SET_AVATAR", url: reader.result });
    reader.readAsDataURL(file);
  }, []);

  const aboutOK = useMemo(() => validateAbout(state.about), [state.about]);
  const accountOK = useMemo(
    () => validateAccount(state.account),
    [state.account]
  );
  const addressOK = useMemo(
    () => validateAddress(state.address),
    [state.address]
  );

  const stepValid = [aboutOK, accountOK, addressOK][state.step];
  const progress = Math.round(
    ([aboutOK, accountOK, addressOK].filter(Boolean).length / steps.length) *
      100
  );
  const maxAllowedStep = aboutOK ? (accountOK ? 2 : 1) : 0;

  const nextStep = () => {
    if (!stepValid) return setShowErrors(true);
    dispatch({ type: "NEXT" });
    setShowErrors(false);
  };
  const prevStep = () => {
    dispatch({ type: "PREV" });
    setShowErrors(false);
  };
  const handleSelectTab = (k) => {
    const idx = Number(k);
    if (idx <= maxAllowedStep) {
      dispatch({ type: "GOTO", index: idx });
      setShowErrors(false);
    } else setShowErrors(true);
  };

  const onFinish = () => {
    if (!addressOK) return setShowErrors(true);
    setShowSummary(true);
    setShowToast(true);
  };

  const headerColor = {
    background: "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
    color: "#003366",
  };

  return (
    <>
      {/* Form Wizard */}
      <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
        <Modal.Header closeButton style={headerColor}>
          <Modal.Title>BUILD YOUR PROFILE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav
            variant="tabs"
            activeKey={state.step}
            onSelect={handleSelectTab}
            className="mb-3"
          >
            {steps.map((label, i) => (
              <Nav.Item key={label}>
                <Nav.Link eventKey={i}>{label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <ProgressBar now={progress} className="mb-3" />
          {state.step === 0 && (
            <AboutForm
              data={state.about}
              onChange={onFieldChange}
              onFileChange={onFileChange}
              showErrors={showErrors}
            />
          )}
          {state.step === 1 && (
            <AccountForm
              data={state.account}
              onChange={onFieldChange}
              showErrors={showErrors}
            />
          )}
          {state.step === 2 && (
            <AddressForm
              data={state.address}
              onChange={onFieldChange}
              showErrors={showErrors}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {state.step > 0 && (
            <Button variant="light" onClick={prevStep}>
              Previous
            </Button>
          )}

          {state.step < steps.length - 1 ? (
            <Button onClick={nextStep} disabled={!stepValid}>
              Next
            </Button>
          ) : (
            <Button onClick={onFinish} disabled={!stepValid}>
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Summary Modal */}
      <Modal
        show={showSummary}
        onHide={() => setShowSummary(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton style={headerColor}>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Card className="border-0 shadow-sm p-3">
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}
            >
              {/* Avatar nhỏ gọn */}
              {state.about.avatarUrl && (
                <img
                  src={state.about.avatarUrl}
                  alt="avatar"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: "2px solid #a1c4fd",
                  }}
                />
              )}

              {/* Thông tin */}
              <div style={{ flex: 1 }}>
                <h5 style={{ color: "#003366" }}>About</h5>
                <p>
                  <b>Name:</b> {state.about.firstName} {state.about.lastName}
                </p>
                <p>
                  <b>Email:</b> {state.about.email}
                </p>

                <h5 className="mt-3" style={{ color: "#003366" }}>
                  Account
                </h5>
                <p>
                  <b>Username:</b> {state.account.username}
                </p>
                <p>
                  <b>Secret question:</b> {state.account.question}
                </p>
                <p>
                  <b>Answer:</b> {state.account.answer}
                </p>

                <h5 className="mt-3" style={{ color: "#003366" }}>
                  Address
                </h5>
                <p>
                  <b>Street:</b> {state.address.streetNumber}{" "}
                  {state.address.streetName}
                </p>
                <p>
                  <b>City:</b> {state.address.city}
                </p>
                <p>
                  <b>Country:</b> {state.address.country}
                </p>
              </div>
            </div>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowSummary(false);
              onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

ProfileWizardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
