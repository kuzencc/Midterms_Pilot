import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");

	const validate = () => {
		const nextErrors = {};
		const normalizedEmail = email.trim();

		if (!normalizedEmail) {
			nextErrors.email = "Email is required.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
			nextErrors.email = "Enter a valid email address.";
		}

		if (!password) {
			nextErrors.password = "Password is required.";
		} else if (password.length < 8) {
			nextErrors.password = "Password must be at least 8 characters.";
		}

		return nextErrors;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const nextErrors = validate();
		setErrors(nextErrors);
		setMessage(
			Object.keys(nextErrors).length === 0
				? "Your details are valid. Connect this form to your sign-in service to continue."
				: "Please correct the errors below."
		);
	};

	const handleChange = (field, value) => {
		if (field === "email") setEmail(value);
		if (field === "password") setPassword(value);
		setMessage("");

		if (errors[field]) {
			const nextErrors = validate();
			setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
		}
	};

	return (
		<main style={styles.page}>
			<section style={styles.card} aria-labelledby="login-title">
				<div style={styles.brand}>Welcome back</div>
				<h1 id="login-title" style={styles.title}>Sign in to your account</h1>
				<p style={styles.subtitle}>Enter your email and password to continue.</p>

				<form onSubmit={handleSubmit} noValidate>
					<div style={styles.field}>
						<label htmlFor="login-email" style={styles.label}>Email address</label>
						<input
							id="login-email"
							name="email"
							type="email"
							autoComplete="username"
							value={email}
							onChange={(event) => handleChange("email", event.target.value)}
							aria-invalid={Boolean(errors.email)}
							aria-describedby={errors.email ? "email-error" : undefined}
							style={{ ...styles.input, ...(errors.email ? styles.invalidInput : {}) }}
						/>
						{errors.email && <p id="email-error" style={styles.error}>{errors.email}</p>}
					</div>

					<div style={styles.field}>
						<label htmlFor="login-password" style={styles.label}>Password</label>
						<input
							id="login-password"
							name="password"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(event) => handleChange("password", event.target.value)}
							aria-invalid={Boolean(errors.password)}
							aria-describedby={errors.password ? "password-error" : undefined}
							style={{ ...styles.input, ...(errors.password ? styles.invalidInput : {}) }}
						/>
						{errors.password && <p id="password-error" style={styles.error}>{errors.password}</p>}
					</div>

					<button type="submit" style={styles.button}>Sign in</button>
					{message && (
						<p role="status" style={errors.email || errors.password ? styles.error : styles.status}>
							{message}
						</p>
					)}
				</form>
			</section>
		</main>
	);
}

const styles = {
	page: {
		minHeight: "100vh",
		display: "grid",
		placeItems: "center",
		padding: "24px",
		boxSizing: "border-box",
		background: "#f4f6fb",
		fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		color: "#182230",
	},
	card: {
		width: "100%",
		maxWidth: "420px",
		padding: "40px",
		boxSizing: "border-box",
		background: "#fff",
		border: "1px solid #e6eaf0",
		borderRadius: "16px",
		boxShadow: "0 16px 40px rgba(24, 34, 48, 0.08)",
	},
	brand: { marginBottom: "10px", color: "#4f46e5", fontSize: "14px", fontWeight: 700 },
	title: { margin: "0", fontSize: "26px", lineHeight: 1.25, letterSpacing: "-0.5px" },
	subtitle: { margin: "10px 0 28px", color: "#667085", fontSize: "14px", lineHeight: 1.5 },
	field: { marginBottom: "20px" },
	label: { display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 },
	input: {
		width: "100%",
		height: "46px",
		padding: "0 12px",
		boxSizing: "border-box",
		border: "1px solid #cfd6e0",
		borderRadius: "8px",
		outlineColor: "#4f46e5",
		fontSize: "15px",
	},
	invalidInput: { borderColor: "#d92d20" },
	error: { margin: "7px 0 0", color: "#b42318", fontSize: "13px" },
	button: {
		width: "100%",
		minHeight: "46px",
		marginTop: "4px",
		border: 0,
		borderRadius: "8px",
		background: "#4f46e5",
		color: "#fff",
		fontSize: "15px",
		fontWeight: 700,
		cursor: "pointer",
	},
	status: { margin: "14px 0 0", color: "#344054", fontSize: "13px", lineHeight: 1.5 },
};
