// DOM Elements
const navbar = document.getElementById("navbar");
const hamburger =
	document.getElementById("hamburger");
const navMenu =
	document.getElementById("nav-menu");
const stickyCTA =
	document.getElementById("sticky-cta");
const demoModal =
	document.getElementById("demo-modal");
const closeModal = document.getElementById(
	"close-modal"
);
const demoForm =
	document.getElementById("demo-form");
const primaryCTA = document.getElementById(
	"primary-cta"
);
const playDemo =
	document.getElementById("play-demo");

// Neural Network Animation
function initNeuralNetworkAnimation() {
	const connectionsSvg = document.querySelector(
		".connections-svg"
	);
	const nodes =
		document.querySelectorAll(".node");
	const center = { x: 200, y: 200 };

	// Create animated connections between nodes and center
	nodes.forEach((node, index) => {
		const line = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"line"
		);
		line.setAttribute(
			"stroke",
			"url(#connectionGradient)"
		);
		line.setAttribute("stroke-width", "2");
		line.setAttribute("opacity", "0.6");
		line.classList.add(`connection-${index}`);
		connectionsSvg.appendChild(line);
	});

	// Animate connections
	function updateConnections() {
		nodes.forEach((node, index) => {
			const rect = node.getBoundingClientRect();
			const containerRect =
				connectionsSvg.getBoundingClientRect();
			const x =
				rect.left -
				containerRect.left +
				rect.width / 2;
			const y =
				rect.top -
				containerRect.top +
				rect.height / 2;

			const line = connectionsSvg.querySelector(
				`.connection-${index}`
			);
			if (line) {
				line.setAttribute("x1", center.x);
				line.setAttribute("y1", center.y);
				line.setAttribute("x2", x);
				line.setAttribute("y2", y);
			}
		});
		requestAnimationFrame(updateConnections);
	}

	updateConnections();
}

// Navbar Scroll Effect
function handleNavbarScroll() {
	if (window.scrollY > 50) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
}

// Sticky CTA Visibility
function handleStickyCTA() {
	const heroSection =
		document.getElementById("hero");
	const footer =
		document.querySelector(".footer");
	const heroRect =
		heroSection.getBoundingClientRect();
	const footerRect =
		footer.getBoundingClientRect();

	// Show sticky CTA only when past hero and before footer
	const viewportHeight = window.innerHeight;
	const footerVisible =
		footerRect.top < viewportHeight;

	if (heroRect.bottom < 0 && !footerVisible) {
		stickyCTA.classList.add("visible");
	} else {
		stickyCTA.classList.remove("visible");
	}
}

// Mobile Navigation Toggle
function toggleMobileNav() {
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
	document.body.style.overflow =
		navMenu.classList.contains("active")
			? "hidden"
			: "";

	// Prevent scroll on body when menu is open
	if (navMenu.classList.contains("active")) {
		document.body.style.position = "fixed";
		document.body.style.width = "100%";
	} else {
		document.body.style.position = "";
		document.body.style.width = "";
	}
}

// Close mobile nav when clicking on links
function closeMobileNav() {
	hamburger.classList.remove("active");
	navMenu.classList.remove("active");
	document.body.style.overflow = "";
	document.body.style.position = "";
	document.body.style.width = "";
}

// Smooth Scroll to Section
function smoothScrollTo(target) {
	const element = document.querySelector(target);
	if (element) {
		const offsetTop = element.offsetTop - 80; // Account for fixed navbar
		window.scrollTo({
			top: offsetTop,
			behavior: "smooth",
		});
	}
}

// Modal Functions
function openModal() {
	demoModal.style.display = "block";
	document.body.style.overflow = "hidden";
}

function closeModalFunc() {
	demoModal.style.display = "none";
	document.body.style.overflow = "";
}

// Form Submission
function handleFormSubmit(e) {
	e.preventDefault();

	// Get form data
	const formData = new FormData(demoForm);
	const data = Object.fromEntries(formData);

	// Simulate form submission
	const submitButton = demoForm.querySelector(
		'button[type="submit"]'
	);
	const originalText = submitButton.textContent;

	submitButton.textContent = "Scheduling...";
	submitButton.disabled = true;

	setTimeout(() => {
		alert(
			"Thank you! We'll contact you soon to schedule your demo."
		);
		closeModalFunc();
		demoForm.reset();
		submitButton.textContent = originalText;
		submitButton.disabled = false;
	}, 2000);
}

// Scroll Animations
function handleScrollAnimations() {
	const animatedElements =
		document.querySelectorAll(
			".step, .benefit-card, .testimonial, .pricing-card"
		);

	animatedElements.forEach((element) => {
		const elementTop =
			element.getBoundingClientRect().top;
		const elementVisible = 150;

		if (
			elementTop <
			window.innerHeight - elementVisible
		) {
			element.style.opacity = "1";
			element.style.transform = "translateY(0)";
		}
	});
}

// Initialize scroll animations styles
function initScrollAnimations() {
	const animatedElements =
		document.querySelectorAll(
			".step, .benefit-card, .testimonial, .pricing-card"
		);

	animatedElements.forEach((element) => {
		element.style.opacity = "0";
		element.style.transform = "translateY(30px)";
		element.style.transition =
			"opacity 0.6s ease, transform 0.6s ease";
	});
}

// Video Demo Play Simulation
function playVideoDemo() {
	const videoPlaceholder = document.querySelector(
		".video-placeholder"
	);
	const playButton =
		document.getElementById("play-demo");

	// Simulate video loading
	playButton.style.display = "none";
	videoPlaceholder.innerHTML = `
        <div style="background: #000; border-radius: 12px; padding: 4rem 2rem; color: white; text-align: center;">
            <h3 style="color: white; margin-bottom: 1rem;">Demo Video Loading...</h3>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
                <div style="width: 0%; height: 100%; background: linear-gradient(135deg, #40E0D0, #26B4AA); border-radius: 2px; animation: loadingBar 3s ease-in-out forwards;"></div>
            </div>
        </div>
    `;

	// Add loading animation
	const style = document.createElement("style");
	style.textContent = `
        @keyframes loadingBar {
            to { width: 100%; }
        }
    `;
	document.head.appendChild(style);

	// Simulate demo completion
	setTimeout(() => {
		videoPlaceholder.innerHTML = `
            <div style="background: linear-gradient(135deg, #40E0D0, #26B4AA); border-radius: 12px; padding: 4rem 2rem; color: white; text-align: center;">
                <h3 style="color: white; margin-bottom: 1rem;">✨ Demo Complete!</h3>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem;">Ready to see the full platform in action?</p>
                <button class="btn btn-secondary" onclick="openModal()" style="background: white; color: #40E0D0; border: none;">Book Your Live Demo</button>
            </div>
        `;
	}, 3000);
}

// Intersection Observer for better performance
function initIntersectionObserver() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform =
						"translateY(0)";
				}
			});
		},
		observerOptions
	);

	const animatedElements =
		document.querySelectorAll(
			".step, .benefit-card, .testimonial, .pricing-card"
		);
	animatedElements.forEach((element) => {
		observer.observe(element);
	});
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
	if (e.key === "Escape") {
		closeModalFunc();
		closeMobileNav();
	}
}

// Performance Optimization - Throttled Scroll Handler
function throttle(func, limit) {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(
				() => (inThrottle = false),
				limit
			);
		}
	};
}

// Event Listeners
document.addEventListener(
	"DOMContentLoaded",
	function () {
		// Initialize animations and observers
		initNeuralNetworkAnimation();
		initScrollAnimations();
		initIntersectionObserver();

		// Scroll events (throttled for performance)
		window.addEventListener(
			"scroll",
			throttle(() => {
				handleNavbarScroll();
				handleStickyCTA();
				handleScrollAnimations();
			}, 16)
		);

		// Mobile navigation
		hamburger.addEventListener(
			"click",
			toggleMobileNav
		);

		// Close mobile nav on link clicks
		document
			.querySelectorAll(".nav-link")
			.forEach((link) => {
				link.addEventListener("click", (e) => {
					e.preventDefault();
					const target =
						link.getAttribute("href");
					closeMobileNav();
					smoothScrollTo(target);
				});
			});

		// Modal events
		primaryCTA.addEventListener(
			"click",
			openModal
		);
		stickyCTA.addEventListener(
			"click",
			openModal
		);
		closeModal.addEventListener(
			"click",
			closeModalFunc
		);

		// Close modal on outside click
		demoModal.addEventListener("click", (e) => {
			if (e.target === demoModal) {
				closeModalFunc();
			}
		});

		// Form submission
		demoForm.addEventListener(
			"submit",
			handleFormSubmit
		);

		// Video demo
		if (playDemo) {
			playDemo.addEventListener(
				"click",
				playVideoDemo
			);
		}

		// Keyboard navigation
		document.addEventListener(
			"keydown",
			handleKeyboardNavigation
		);

		// All CTA buttons should open the modal
		document
			.querySelectorAll(".btn-primary")
			.forEach((button) => {
				if (
					button.textContent.includes("Demo") ||
					button.textContent.includes("Book")
				) {
					button.addEventListener(
						"click",
						openModal
					);
				}
			});

		// Secondary CTAs for free trial
		document
			.querySelectorAll(".btn-secondary")
			.forEach((button) => {
				if (
					button.textContent.includes("Free") ||
					button.textContent.includes("Try")
				) {
					button.addEventListener("click", () => {
						alert(
							"Free trial coming soon! For now, book a demo to see our platform."
						);
						openModal();
					});
				}
			});
	}
);

// Window resize handler for mobile optimization
window.addEventListener(
	"resize",
	throttle(() => {
		if (window.innerWidth > 768) {
			closeMobileNav();
		}
	}, 250)
);

// Page visibility API for performance
document.addEventListener(
	"visibilitychange",
	() => {
		if (document.hidden) {
			// Pause animations when page is not visible
			document.body.style.animationPlayState =
				"paused";
		} else {
			// Resume animations when page becomes visible
			document.body.style.animationPlayState =
				"running";
		}
	}
);

// Preload critical resources
function preloadResources() {
	const link = document.createElement("link");
	link.rel = "preload";
	link.href =
		"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
	link.as = "style";
	document.head.appendChild(link);
}

// Initialize on page load
if (document.readyState === "loading") {
	document.addEventListener(
		"DOMContentLoaded",
		preloadResources
	);
} else {
	preloadResources();
}

// Expose functions globally for inline event handlers
window.openModal = openModal;
window.closeModalFunc = closeModalFunc;
window.playVideoDemo = playVideoDemo;

// Add touch-friendly interactions
function initTouchInteractions() {
	// Add active state for touch on buttons
	const buttons =
		document.querySelectorAll(".btn");
	buttons.forEach((button) => {
		button.addEventListener(
			"touchstart",
			function () {
				this.style.transform = "scale(0.98)";
			},
			{ passive: true }
		);

		button.addEventListener(
			"touchend",
			function () {
				this.style.transform = "";
			},
			{ passive: true }
		);
	});

	// Improve touch scrolling
	document.body.style.webkitOverflowScrolling =
		"touch";
}

// Handle orientation change
function handleOrientationChange() {
	// Close mobile nav on orientation change
	if (window.innerWidth > 768) {
		closeMobileNav();
	}

	// Recalculate viewport height for mobile browsers
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty(
		"--vh",
		`${vh}px`
	);
}

// Initialize orientation handler
window.addEventListener(
	"orientationchange",
	handleOrientationChange
);
window.addEventListener(
	"resize",
	handleOrientationChange
);

// Set initial viewport height
handleOrientationChange();

// Initialize touch interactions on load
document.addEventListener(
	"DOMContentLoaded",
	initTouchInteractions
);
