import { z } from "zod";

export const SignInFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type SignInForm = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password is too short"),
	name: z.string().min(1, "Name is required"),
	age: z
		.string()
		.min(1, "Age is required")
		.refine((age) => !isNaN(Number(age)), "Age must be a number"),
	height: z
		.string()
		.min(1, "Height is required")
		.refine((height) => !isNaN(Number(height)), "Height must be a number"),
	weight: z
		.string()
		.min(1, "Weight is required")
		.refine((height) => !isNaN(Number(height)), "Weight must be a number"),
	fitnessGoal: z.string().min(1, "Fitness goal is required"),
});

export type SignUpForm = z.infer<typeof SignUpFormSchema>;
