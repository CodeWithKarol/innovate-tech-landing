// DOM Elements
const header = document.querySelector(".header");
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
	if (!connectionsSvg) return;
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

// Modern Header Scroll Effect
function handleNavbarScroll() {
	if (!header) return;

	if (window.scrollY > 20) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
}

// Sticky CTA Visibility
function handleStickyCTA() {
	if (!stickyCTA) return;

	const heroSection =
		document.getElementById("hero");
	const footer =
		document.querySelector(".footer");

	if (!heroSection || !footer) return;

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
	if (demoModal) {
		demoModal.showModal();
		document.body.style.overflow = "hidden";
	}
}

function closeModalFunc() {
	if (demoModal) {
		demoModal.close();
		document.body.style.overflow = "";
	}
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

// Newsletter Signup Handler
function handleNewsletterSignup(e) {
	e.preventDefault();

	const form = e.target;
	const emailInput = form.querySelector(
		".newsletter-input"
	);
	const submitButton = form.querySelector(
		".newsletter-submit"
	);
	const originalHTML = submitButton.innerHTML;
	const email = emailInput.value.trim();

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		emailInput.style.borderColor = "#EE6C4D";
		emailInput.style.boxShadow =
			"0 0 12px rgba(238, 108, 77, 0.3)";
		setTimeout(() => {
			emailInput.style.borderColor =
				"rgba(64, 224, 208, 0.2)";
			emailInput.style.boxShadow = "";
		}, 2000);
		return;
	}

	// Disable button and show loading state
	submitButton.disabled = true;
	submitButton.innerHTML =
		'<span class="submit-icon">⏳</span>';

	// Simulate API call
	setTimeout(() => {
		// Show success state
		submitButton.innerHTML =
			'<span class="submit-icon">✓</span>';
		submitButton.style.background =
			"linear-gradient(135deg, #22c55e, #16a34a)";
		emailInput.style.borderColor =
			"rgba(34, 197, 94, 0.3)";
		emailInput.style.background =
			"rgba(34, 197, 94, 0.05)";

		// Reset form after success
		setTimeout(() => {
			form.reset();
			submitButton.disabled = false;
			submitButton.innerHTML = originalHTML;
			submitButton.style.background = "";
			emailInput.style.borderColor = "";
			emailInput.style.background = "";
		}, 2000);
	}, 1200);
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
			".step, .benefit-card, .testimonial, .pricing-card, .section-header, .section-title, .section-subtitle"
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
	const videoContent = document.querySelector(
		".demo-video-content"
	);
	const playButton =
		document.getElementById("play-demo");

	if (!videoContent || !playButton) {
		console.error(
			"Demo video elements not found"
		);
		return;
	}

	// Simulate video loading
	playButton.style.display = "none";
	videoContent.innerHTML = `
        <div style="background: #000; border-radius: 16px; padding: 4rem 2rem; color: white; text-align: center; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.5rem;">Demo Video Loading...</h3>
            <div style="width: 80%; max-width: 400px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
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
		videoContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #40E0D0, #26B4AA); border-radius: 16px; padding: 4rem 2rem; color: white; text-align: center; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <h3 style="color: white; margin-bottom: 1rem; font-size: 1.75rem;">✨ Demo Complete!</h3>
                <p style="color: rgba(255,255,255,0.9); margin-bottom: 2rem; font-size: 1.125rem;">Ready to see the full platform in action?</p>
                <button class="btn btn-secondary" onclick="openModal()" style="background: white; color: #40E0D0; border: none; padding: 0.875rem 2rem; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;">Book Your Live Demo</button>
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
			".step, .benefit-card, .testimonial, .pricing-card, .section-header, .section-title, .section-subtitle"
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

// Pricing Toggle Functionality
function initPricingToggle() {
	const toggleButtons = document.querySelectorAll(
		".pricing-toggle .toggle-btn"
	);
	const priceAmounts = document.querySelectorAll(
		".plan-amount"
	);

	if (
		!toggleButtons.length ||
		!priceAmounts.length
	)
		return;

	toggleButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove active class from all buttons
			toggleButtons.forEach((btn) =>
				btn.classList.remove("active")
			);

			// Add active class to clicked button
			this.classList.add("active");

			// Get billing type
			const billingType = this.getAttribute(
				"data-billing"
			);

			// Update all price amounts
			priceAmounts.forEach((amount) => {
				const monthlyPrice = amount.getAttribute(
					"data-monthly"
				);
				const annualPrice = amount.getAttribute(
					"data-annual"
				);

				if (monthlyPrice && annualPrice) {
					if (billingType === "annual") {
						amount.textContent = annualPrice;
					} else {
						amount.textContent = monthlyPrice;
					}
				}
			});

			// Update billing text
			const billingTexts =
				document.querySelectorAll(
					".plan-billing"
				);
			billingTexts.forEach((text) => {
				if (billingType === "annual") {
					text.textContent = "Billed annually";
				} else {
					text.textContent = "Billed monthly";
				}
			});
		});
	});
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
		initCTAEnhancements();
		animateCounters();
		initPricingToggle();

		// Scroll events (throttled for performance)
		window.addEventListener(
			"scroll",
			throttle(() => {
				handleNavbarScroll();
				if (stickyCTA) {
					handleStickyCTA();
				}
				handleScrollAnimations();
			}, 16)
		);

		// Mobile navigation
		if (hamburger) {
			hamburger.addEventListener(
				"click",
				toggleMobileNav
			);
		}

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
		if (primaryCTA) {
			primaryCTA.addEventListener(
				"click",
				openModal
			);
		}
		if (stickyCTA) {
			stickyCTA.addEventListener(
				"click",
				openModal
			);
		}
		if (closeModal) {
			closeModal.addEventListener(
				"click",
				closeModalFunc
			);
		}

		// Close modal on outside click
		if (demoModal) {
			demoModal.addEventListener("click", (e) => {
				if (e.target === demoModal) {
					closeModalFunc();
				}
			});
		}

		// Form submission
		if (demoForm) {
			demoForm.addEventListener(
				"submit",
				handleFormSubmit
			);
		}

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

// Expose functions globally for inline event handlers
window.openModal = openModal;
window.closeModalFunc = closeModalFunc;
window.playVideoDemo = playVideoDemo;
window.handleNewsletterSignup =
	handleNewsletterSignup;

// CTA Section Enhanced Interactions
function initCTAEnhancements() {
	const ctaSection = document.querySelector(
		".cta-section"
	);
	const ctaCards = document.querySelectorAll(
		".cta-visual-card"
	);
	const ctaMainBtn = document.querySelector(
		".cta-main-btn"
	);
	const ctaSecondaryBtn = document.querySelector(
		".cta-secondary-btn"
	);
	const trustAvatars = document.querySelectorAll(
		".trust-avatar"
	);

	if (!ctaSection) return;

	// Add hover effect to cards
	ctaCards.forEach((card, index) => {
		card.addEventListener(
			"mouseenter",
			function () {
				// Stagger the cards on hover
				ctaCards.forEach((c, i) => {
					if (i < index) {
						c.style.transform =
							"translateX(-10px)";
					} else if (i > index) {
						c.style.transform =
							"translateX(10px)";
					}
				});
			}
		);

		card.addEventListener(
			"mouseleave",
			function () {
				// Reset positions
				ctaCards.forEach((c, i) => {
					if (i === 0) {
						c.style.transform = "translateX(0)";
					} else if (i === 1) {
						c.style.transform = "translateX(0)";
					} else {
						c.style.transform = "translateX(0)";
					}
				});
			}
		);
	});

	// Animate trust avatars on hover
	trustAvatars.forEach((avatar, index) => {
		avatar.addEventListener(
			"mouseenter",
			function () {
				trustAvatars.forEach((a, i) => {
					if (i <= index) {
						a.style.opacity = "1";
						a.style.transform = "scale(1.1)";
					}
				});
			}
		);
	});

	// Secondary button scroll animation
	if (ctaSecondaryBtn) {
		ctaSecondaryBtn.addEventListener(
			"click",
			function () {
				const pricingSection =
					document.getElementById("pricing");
				if (pricingSection) {
					pricingSection.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}
		);
	}

	// CTA section reveal animation on scroll
	const ctaRevealObserver =
		new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add(
							"revealed"
						);
					}
				});
			},
			{ threshold: 0.1 }
		);

	ctaRevealObserver.observe(ctaSection);
}

// Counter animation for stats
function animateCounters() {
	const counters = document.querySelectorAll(
		".metric-value"
	);

	const runCounterAnimation = (element) => {
		const text = element.textContent.trim();
		const isPercentage = text.includes("%");
		const isMultiplier = text.includes("x");
		const isPlus = text.includes("+");
		const isMilitary = text.includes("K");

		let startValue = 0;
		let endValue = 0;
		let suffix = "";

		if (isPercentage) {
			endValue = parseInt(text);
			suffix = "%";
		} else if (isMultiplier) {
			endValue = parseInt(text);
			suffix = "x";
		} else if (isMilitary) {
			endValue = parseInt(text);
			suffix = "K";
		} else {
			return; // Skip if not a countable format
		}

		const duration = 1200;
		const steps = 60;
		const stepValue = endValue / steps;
		const stepDuration = duration / steps;
		let currentStep = 0;

		const counter = setInterval(() => {
			currentStep++;
			const currentValue = Math.round(
				startValue + stepValue * currentStep
			);
			element.textContent = currentValue + suffix;

			if (currentStep >= steps) {
				element.textContent = endValue + suffix;
				clearInterval(counter);
			}
		}, stepDuration);
	};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					runCounterAnimation(entry.target);
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.5 }
	);

	counters.forEach((counter) => {
		observer.observe(counter);
	});
}

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

// ===== Scroll Animations =====
function initScrollAnimations() {
	const sections =
		document.querySelectorAll("section");

	// Animation patterns for different sections
	const animationPatterns = [
		null, // Hero - no animation (always visible)
		"fade-scale", // How It Works
		"slide-left", // Benefits
		"slide-right", // Demo
		"fade-up", // Testimonials
		"fade-scale", // For Schools
		"fade-up", // CTA
		"slide-left", // Pricing
	];

	const observerOptions = {
		threshold: 0.15,
		rootMargin: "0px 0px -100px 0px",
	};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(
						"animate-in"
					);
					// Unobserve after animation to improve performance
					observer.unobserve(entry.target);
				}
			});
		},
		observerOptions
	);

	sections.forEach((section, index) => {
		// Skip hero section (first section)
		if (index === 0) return;

		// Add animation class based on pattern
		const animationClass =
			animationPatterns[index];
		if (animationClass) {
			section.classList.add(animationClass);
			// Observe the section
			observer.observe(section);
		}
	});
}

// Initialize scroll animations
document.addEventListener(
	"DOMContentLoaded",
	() => {
		initScrollAnimations();
	}
);

// Video Modal Logic
const videoModal = document.getElementById('video-modal');
const videoFrame = document.getElementById('demo-video-frame');
// Using a generic tech/future learning video
const videoUrl = 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1';

function openVideoModal() {
    if (videoModal && videoFrame) {
        videoFrame.src = videoUrl;
        videoModal.showModal();
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    if (videoModal && videoFrame) {
        videoModal.close();
        videoFrame.src = '';
        document.body.style.overflow = '';
    }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.open) {
        closeVideoModal();
    }
});

