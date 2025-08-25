// src/pages/RegisterPage.jsx
import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  ProgressBar,
  Nav,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCamera } from "react-icons/ai";

/* ----------------------------- utils ----------------------------- */
const emailOk = (s) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s || "");
const hasLower = (s) => /[a-z]/.test(s);
const hasUpper = (s) => /[A-Z]/.test(s);
const hasNum = (s) => /\d/.test(s);
const hasSpecial = (s) => /[^A-Za-z0-9]/.test(s);

/* --------------------------- reducer ----------------------------- */
const initial = {
  step: 1, // 1: About, 2: Account, 3: Address
  about: { firstName: "", lastName: "", email: "", age: "", avatar: "" },
  account: {
    username: "",
    password: "",
    confirm: "",
    question: "pet",
    answer: "",
    showPw: false,
    showPw2: false,
  },
  address: { country: "Vietnam", city: "", street: "" },
  errors: { about: {}, account: {}, address: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const { section, name, value } = action;
      return {
        ...state,
        [section]: { ...state[section], [name]: value },
      };
    }
    case "SET_ERRORS": {
      const { section, errors } = action;
      return { ...state, errors: { ...state.errors, [section]: errors } };
    }
    case "TOGGLE": {
      const { section, name } = action;
      return {
        ...state,
        [section]: { ...state[section], [name]: !state[section][name] },
      };
    }
    case "SET_AVATAR": {
      return { ...state, about: { ...state.about, avatar: action.dataUrl } };
    }
    case "NEXT":
      return { ...state, step: Math.min(3, state.step + 1) };
    case "PREV":
      return { ...state, step: Math.max(1, state.step - 1) };
    default:
      return state;
  }
}

/* -------------------------- validators -------------------------- */
function validateAbout(a) {
  const e = {};
  if (!a.firstName.trim()) e.firstName = "First name is required";
  if (!a.lastName.trim()) e.lastName = "Last name is required";
  if (!a.email.trim()) e.email = "Email is required";
  else if (!emailOk(a.email)) e.email = "Email is invalid";
  if (!String(a.age).trim()) e.age = "Age is required";
  else if (Number.isNaN(+a.age)) e.age = "Age must be a number";
  else if (+a.age < 13) e.age = "You must be at least 13";
  return e;
}

function validateAccount(a) {
  const e = {};
  if (!a.username.trim()) e.username = "Username is required";
  else if (a.username.trim().length < 7) e.username = "Username must be ≥ 7 characters";

  if (!a.password) e.password = "Password is required";
  else {
    const okLen = a.password.length >= 9;
    const okSet = hasLower(a.password) && hasUpper(a.password) && hasNum(a.password) && hasSpecial(a.password);
    if (!okLen || !okSet)
      e.password = "≥9 chars & include lower + upper + number + special";
  }

  if (!a.confirm) e.confirm = "Please confirm your password";
  else if (a.confirm !== a.password) e.confirm = "Passwords do not match";

  if (!a.answer.trim()) e.answer = "Answer is required";
  return e;
}

function validateAddress(ad) {
  const e = {};
  if (!ad.country) e.country = "Country is required";
  if (!ad.city.trim()) e.city = "City is required";
  if (!ad.street.trim()) e.street = "Street is required";
  return e;
}

/* --------------------------- component --------------------------- */
export default function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, initial);
  const { step, about, account, address, errors } = state;

  const [sp] = useSearchParams();
  const redirect_uri = sp.get("redirect_uri") || "/";
  const navigate = useNavigate();
  const { register, setRedirectAfterLogin } = useAuth();
  const { show } = useToast();

  useEffect(() => setRedirectAfterLogin(redirect_uri), [redirect_uri, setRedirectAfterLogin]);

  const onField = useCallback(
    (section, name) => (e) =>
      dispatch({ type: "SET_FIELD", section, name, value: e.target.value }),
    []
  );

  const onPickAvatar = useCallback((file) => {
    if (!file) return dispatch({ type: "SET_AVATAR", dataUrl: "" });
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      dispatch({ type: "SET_ERRORS", section: "about", errors: { ...errors.about, avatar: "Only JPG/PNG is allowed" } });
      return;
    }
    const mb = file.size / (1024 * 1024);
    if (mb > 2) {
      dispatch({ type: "SET_ERRORS", section: "about", errors: { ...errors.about, avatar: "Max size is 2MB" } });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      dispatch({ type: "SET_AVATAR", dataUrl: reader.result });
      dispatch({ type: "SET_ERRORS", section: "about", errors: { ...errors.about, avatar: "" } });
    };
    reader.readAsDataURL(file);
  }, [errors.about]);

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const goNext = useCallback(async () => {
    if (step === 1) {
      const e = validateAbout(about);
      dispatch({ type: "SET_ERRORS", section: "about", errors: e });
      if (Object.keys(e).length) return;
      dispatch({ type: "NEXT" });
    } else if (step === 2) {
      const e = validateAccount(account);
      dispatch({ type: "SET_ERRORS", section: "account", errors: e });
      if (Object.keys(e).length) return;
      dispatch({ type: "NEXT" });
    } else {
      const e = validateAddress(address);
      dispatch({ type: "SET_ERRORS", section: "address", errors: e });
      if (Object.keys(e).length) return;

      // submit
      await register({
        name: `${about.firstName} ${about.lastName}`.trim(),
        email: about.email,
        avatar: about.avatar,
        username: account.username,
        password: account.password,
        secretQuestion: account.question,
        answer: account.answer,
        address,
      });
      show("Submitted successfully!", "success");
      navigate(redirect_uri || "/");
    }
  }, [step, about, account, address, register, show, navigate, redirect_uri]);

  const goPrev = useCallback(() => dispatch({ type: "PREV" }), []);

  return (
    <Container className="py-4" style={{ maxWidth: 900 }}>
      <Card className="shadow-sm border-0" style={{ overflow: "hidden" }}>
        <Card.Header
          className="fw-semibold"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,118,60,.12) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          Build your profile
        </Card.Header>

        <Card.Body>
          <Nav variant="tabs" activeKey={step}>
            <Nav.Item><Nav.Link eventKey={1}>About</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey={2}>Account</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey={3}>Address</Nav.Link></Nav.Item>
          </Nav>

          <ProgressBar
            now={progress}
            className="my-3"
            style={{ height: 8 }}
            variant="success"
          />

          {/* -------- Step 1: About -------- */}
          {step === 1 && (
            <Row className="mt-3">
              <Col md={5} className="d-flex flex-column align-items-center">
                <div
                  style={{
                    width: 190,
                    height: 190,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 30%, #fff 0%, #f8fafb 50%, #eef3f0 100%)",
                    border: "3px solid #dbe7df",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                  }}
                  className="mb-2"
                >
                  {about.avatar ? (
                    <img
                      src={about.avatar}
                      alt="avatar"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                      No image
                    </div>
                  )}
                  <label
                    htmlFor="pick-avatar"
                    title="Choose picture"
                    className="bg-white rounded-circle shadow d-inline-flex align-items-center justify-content-center"
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      width: 38,
                      height: 38,
                      cursor: "pointer",
                      border: "1px solid #e3e8e5",
                    }}
                  >
                    <AiOutlineCamera />
                  </label>
                  <input
                    id="pick-avatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="d-none"
                    onChange={(e) => onPickAvatar(e.target.files?.[0])}
                  />
                </div>
                <small className="text-muted">JPG/PNG ≤ 2MB</small>
                {errors.about?.avatar && (
                  <div className="text-danger small mt-1">{errors.about.avatar}</div>
                )}
              </Col>

              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={about.firstName}
                    onChange={onField("about", "firstName")}
                    placeholder="First Name"
                  />
                  {errors.about?.firstName && (
                    <div className="text-danger small">{errors.about.firstName}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={about.lastName}
                    onChange={onField("about", "lastName")}
                    placeholder="Last Name"
                  />
                  {errors.about?.lastName && (
                    <div className="text-danger small">{errors.about.lastName}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={about.email}
                    onChange={onField("about", "email")}
                    placeholder="you@example.com"
                  />
                  {errors.about?.email && (
                    <div className="text-danger small">{errors.about.email}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    value={about.age}
                    onChange={onField("about", "age")}
                    placeholder="≥ 13"
                  />
                  {errors.about?.age && (
                    <div className="text-danger small">{errors.about.age}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          )}

          {/* -------- Step 2: Account -------- */}
          {step === 2 && (
            <>
              <Row className="mt-3">
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      value={account.username}
                      onChange={onField("account", "username")}
                      placeholder="≥ 7 characters"
                    />
                    {errors.account?.username && (
                      <div className="text-danger small">{errors.account.username}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={account.showPw ? "text" : "password"}
                      value={account.password}
                      onChange={onField("account", "password")}
                      placeholder="≥9 chars with upper/lower/number/special"
                    />
                    <Button
                      variant="link"
                      className="p-0 position-absolute"
                      style={{ right: 10, top: 36 }}
                      onClick={() => dispatch({ type: "TOGGLE", section: "account", name: "showPw" })}
                      aria-label="toggle password"
                    >
                      {account.showPw ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                    {errors.account?.password && (
                      <div className="text-danger small">{errors.account.password}</div>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      type={account.showPw2 ? "text" : "password"}
                      value={account.confirm}
                      onChange={onField("account", "confirm")}
                    />
                    <Button
                      variant="link"
                      className="p-0 position-absolute"
                      style={{ right: 10, top: 36 }}
                      onClick={() => dispatch({ type: "TOGGLE", section: "account", name: "showPw2" })}
                      aria-label="toggle confirm"
                    >
                      {account.showPw2 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                    {errors.account?.confirm && (
                      <div className="text-danger small">{errors.account.confirm}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Secret question</Form.Label>
                    <Form.Select
                      value={account.question}
                      onChange={onField("account", "question")}
                    >
                      <option value="pet">What is your first pet’s name?</option>
                      <option value="mother">What is your mother’s maiden name?</option>
                      <option value="city">In which city were you born?</option>
                      <option value="teacher">Who was your favorite teacher?</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      value={account.answer}
                      onChange={onField("account", "answer")}
                    />
                    {errors.account?.answer && (
                      <div className="text-danger small">{errors.account.answer}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {/* -------- Step 3: Address -------- */}
          {step === 3 && (
            <>
              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      value={address.country}
                      onChange={onField("address", "country")}
                    >
                      <option>Vietnam</option>
                      <option>Korea</option>
                      <option>Italy</option>
                      <option>Japan</option>
                      <option>France</option>
                    </Form.Select>
                    {errors.address?.country && (
                      <div className="text-danger small">{errors.address.country}</div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={address.city}
                      onChange={onField("address", "city")}
                    />
                    {errors.address?.city && (
                      <div className="text-danger small">{errors.address.city}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-2">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  value={address.street}
                  onChange={onField("address", "street")}
                />
                {errors.address?.street && (
                  <div className="text-danger small">{errors.address.street}</div>
                )}
              </Form.Group>
            </>
          )}

          {/* -------- Actions -------- */}
          <div className="d-flex justify-content-between mt-3">
            {step > 1 ? (
              <Button variant="secondary" onClick={goPrev}>
                Previous
              </Button>
            ) : (
              <span />
            )}

            <Button variant="success" onClick={goNext}>
              {step === 3 ? "Finish" : "Next"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
