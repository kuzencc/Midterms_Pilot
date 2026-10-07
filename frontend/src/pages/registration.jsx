import { useState } from "react";

const initialForm = {
	fullName: "",
	email: "",
	password: "",
	confirmPassword: "",
	terms: false,
};

const styles = {
	page: {
		minHeight: "100vh",
		display: "grid",
		placeItems: "center",
		padding: "32px 16px",
		background: "#f4f7fb",
		color: "#172033",
		fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	},
	card: {
		width: "100%",
		maxWidth: 440,
		padding: "36px 32px",
		background: "#fff",
		borderRadius: 16,
		boxShadow: "0 12px 36px rgba(23, 32, 51, 0.09)",
	},
	heading: { margin: "0 0 8px", fontSize: 28 },
	intro: { margin: "0 0 28px", color: "#667085", lineHeight: 1.5 },
	field: { marginBottom: 18 },
	label: { display: "block", marginBottom: 7, fontSize: 14, fontWeight: 600 },
	input: {
		boxSizing: "border-box",
		width: "100%",
		padding: "11px 12px",
		border: "1px solid #cbd2df",
		borderRadius: 8,
		font: "inherit",
		outlineColor: "#3157d5",
	},
	error: { margin: "6px 0 0", color: "#b42318", fontSize: 13 },
	checkbox: { display: "flex", alignItems: "flex-start", gap: 9, margin: "4px 0 20px", fontSize: 14 },
	button: {
		width: "100%",
		padding: "12px 16px",
		border: 0,
		borderRadius: 8,
		background: "#3157d5",
		color: "#fff",
		font: "inherit",
		fontWeight: 700,
		cursor: "pointer",
	},
	success: { marginTop: 18, color: "#067647", textAlign: "center", fontSize: 14 },
};

export default function Registration() {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	function update(event) {
		const { name, value, checked, type } = event.target;
		setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
		setSubmitted(false);
	}

	function validate() {
		const nextErrors = {};
		if (!form.fullName.trim()) nextErrors.fullName = "Enter your full name.";
		if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
		if (form.password.length < 8) nextErrors.password = "Use at least 8 characters for your password.";
		if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match.";
		if (!form.terms) nextErrors.terms = "You must accept the terms to continue.";
		return nextErrors;
	}

	function handleSubmit(event) {
		event.preventDefault();
		const nextErrors = validate();
		setErrors(nextErrors);
		setSubmitted(Object.keys(nextErrors).length === 0);
	}

	function field(name, label, type, autoComplete, minLength) {
		return (
			<div style={styles.field}>
				<label htmlFor={name} style={styles.label}>{label}</label>
				<input
					id={name}
					name={name}
					type={type}
					value={form[name]}
					onChange={update}
					autoComplete={autoComplete}
					minLength={minLength}
					style={styles.input}
					aria-invalid={Boolean(errors[name])}
					aria-describedby={errors[name] ? `${name}-error` : undefined}
				/>
				{errors[name] && <p id={`${name}-error`} role="alert" style={styles.error}>{errors[name]}</p>}
			</div>
		);
	}

	return (
		<main style={styles.page}>
			<section style={styles.card} aria-labelledby="registration-title">
				<h1 id="registration-title" style={styles.heading}>Create your account</h1>
				<p style={styles.intro}>Fill in your details to get started.</p>
				<form onSubmit={handleSubmit} noValidate>
					{field("fullName", "Full name", "text", "name")}
					{field("email", "Email address", "email", "email")}
					{field("password", "Password", "password", "new-password", 8)}
					{field("confirmPassword", "Confirm password", "password", "new-password")}
					<div style={styles.checkbox}>
						<input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={update} aria-invalid={Boolean(errors.terms)} aria-describedby={errors.terms ? "terms-error" : undefined} />
						<label htmlFor="terms">I agree to the terms and conditions.</label>
					</div>
					{errors.terms && <p id="terms-error" role="alert" style={styles.error}>{errors.terms}</p>}
					<button type="submit" style={styles.button}>Create account</button>
					{submitted && <p role="status" style={styles.success}>Registration details are valid. Your account is ready to be created.</p>}
				</form>
			</section>
		</main>
	);
}
