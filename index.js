const readline= require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: ''
})

const ProgressBar = (n) => {
	const array = [...Array(n).keys()]

	const _setNumberOfChar = (p) => {
		const x = Math.round(p*n/100);
		return x;
	}

	const progressBar = (p) => {
		const status = _setNumberOfChar(p);
		const bar = array.map((i, n) => n<=status?'█':'▓').join('')
		return bar+(p+'%')
	}
	
	return {
		set: progressBar,
	}
}

/**
 * Testing
 **/
const Test = (progressBar) => {
	/* test - Function Generator
	 * that's responsible to test the Progress Bar object, that will give to P.B. object the porcentage to return a string
	 * @params {void}
	 */
	const _test = function*(){
		for (let i=0; i <= 100; i++){
			yield new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(progressBar.set(i))
				}, 200)
			})
		}
	}
	/* main - async Function
	 * that's responsible to write on console the progress bar
	 */
	const main = async () => {
		rl.prompt()
		for await (let progressBar of _test()){
			rl.write('', { ctrl: true, name: 'u' });
			rl.write(progressBar);
		}
		rl.close()

	}

	return main()
}

const myBar = ProgressBar(50)

Test(myBar)