import $ from "jquery";
import { usersService } from "../common/users-service";
import { routeChange } from "../router/route-change";
import { main_router } from "../it-spa";
import "./forms.scss";

export const login = () => {
	const fragment = $(new DocumentFragment());

	// const getAllUsers = usersService.getUsers();
	// console.log(getAllUsers);

	const container = $(
		`<form class="text-center border border-light p-5 form login" action="#!"></form>`
	);

	const form = $(`
	  <p class="h4 mb-4">Sign in</p>

    <!-- Email -->
    <input type="email" id="email" class="form-control mb-4" placeholder="E-mail">

    <!-- Password -->
    <input type="password" id="password" class="form-control mb-4" placeholder="Password">
`);

	// const form = $(`<form class="login was-validated">
	//   <div class="form-group">
	//     <label for="email">Email address</label>
	// 		<input type="email" class="form-control" id="email" placeholder="name@example.com" aria-describedby="emailHelp" required>
	// 		<div class="invalid-feedback">
	// 			This is invalid e-mail!
	// 		</div>
	// 		<div class="valid-feedback">
	// 			Looks good!
	// 		</div>
	//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
	//   </div>
	//   <div class="form-group">
	//     <label for="exampleInputPassword1">Password</label>
	//     <input type="password" class="form-control" id="password">
	//   </div>
	// </form>
	//   `);
	const btn = $(
		`<button class="btn btn-info btn-block my-4" type="submit">Zaloguj się</button>`
	);

	const register = $(`<p>Not a member?
        <a href="">Register</a>
		</p>`);

	btn.on("click", e => {
		e.preventDefault();
		const email = $("#email").val();
		const password = $("#password").val();
		const obj = { email, password };
		console.log(email, password);

		let usersData = [];
		fetch("http://localhost:3000/users")
			.then(res => res.json())
			.then(resJSON => {
				console.log(resJSON);
				usersData = resJSON;
				let found = usersData.some(item => {
					return item.email === email && item.password === password;
				});
				console.log(found);
				const date = new Date();
				const time = date.getTime();
				const expireTime = time + 1000 * 3600;
				date.setTime(expireTime);
				if (found) {
					document.cookie = `user_token=${email};expires=${date}`;
					// navbar.trigger(routeChange, { path: path });
					main_router.navigate("/");
				} else {
					/// alert
				}
			});
	});

	$(container).append(form);
	$(container).append(btn);
	$(container).append(register);
	fragment.append(container);

	return Promise.resolve(fragment);
};
