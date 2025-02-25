import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./signin.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setOpen(false); 

    try {
        const response = await axios.post("http://localhost:5000/api/auth/signin", {
            email,
            mdp,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify({ id: response.data.user.id, nomPrenom: response.data.user.nomPrenom }));

        setOpen(true);
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    } catch (error) {
        if (error.response?.status === 401) {
            setError("Email ou mot de passe incorrect.");
        } else if (error.response?.status === 403) {
            setError("Votre compte n'est pas activé. Vérifiez votre e-mail.");
        } else {
            setError("Une erreur est survenue. Veuillez réessayer.");
        }
        setOpen(true);
    }
};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="signin-container">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? error : "Connexion réussie !"}
        </Alert>
      </Snackbar>

      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Entrez votre Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Mot de passe</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Entrez votre mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            required
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Se souvenir de moi</label>
          </div>
          <span className="span">Mot de passe oublié ?</span>
        </div>

        <button className="button-submit" type="submit">
          Se connecter
        </button>

        <p className="p">
          Pas encore de compte ?{" "}
          <Link to="/signup" className="span">
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
