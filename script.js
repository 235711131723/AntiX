// ==UserScript==
// @name         AntiX
// @description  Replace the X icon by the legacy Twitter icon.
// @namespace    http://tampermonkey.net/
// @author       235711131723
// @version      1.0.8
// @updateURL    https://raw.githubusercontent.com/235711131723/AntiX/main/script.js
// @downloadURL  https://raw.githubusercontent.com/235711131723/AntiX/main/script.js
// @match        https://twitter.com/*
// ==/UserScript==

(function () {
    /**
     * The base64-encoded legacy favicon (PNG format).
     * 
     * Credit : https://icons8.com/icon/13963/twitter
     */
    const favicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4nO2VsWsVQRDGJzPvUIKIYvVEbAULUf+AqIWpBEUJNgr6P2hhJRY2IqhYiDYW4rvZhacQQSRVSKWFhYqFIkhExUDA5Oa7RDSychdFoy9m770r7wfTzc33ze7sHFFDQ0MvzgemKviZDaJ2QRSvxdlXcfZB1G6RX9j+K6Wl2Qh10Y6qJ4qrkuaHo5LvzW9hxXNxCP+EYlYU10TxkhWTFMJQpAGbLjtJs6MRZl1P8T+CHZ5JikOiNhZrIF/+2L6L2kV6GNb1TOyiXeasYWA5x95RN98WZYAdXvxV5A07O0E3Q7LCqLeDa4sjFFdEnXxrlHgBO5xZpdgnUbvB3o6Tn98hKUZjDIjaJar0Au5/3sQOU1HFY07A42y8gRCGRDHDiglR+1aLgeL6qsDOHtXVfRHFdVUykHjsFrWlegzYW+oH0eyYqC3UYOJyXwbo7txm0fwIO3vct7jal0rPbwW3w3pRez9Q94rrNAiS2v7fW7FyvCp+UjQoScd2sbMH4myxwuAtJoq9VCfscSpqKBVzLZ/tq0e1izYrTrOzp5FDN510sGcgzZZmIz+34Mcq0y4OV+jO7MZ6Oh8Pw+xxstyICltFdInVnrDiXP9PLQYfhHy2U9QOlMspxWh5zONhOOr7hoYG+j8/APk7LxQ9Q41nAAAAAElFTkSuQmCC';

    /**
     * The base64-encoded legacy logo.
     * 
     * Credit : https://www.iconsdb.com/icons/preview/white/twitter-xxl.png
     */
    const logo = 'data:image/png;base64,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';

    class AntiX {
        /**
         * A class to replace unpleasing changes
         * that Elon Musk forcefully pushes on Twitter
         * like the X icon.
         */
        constructor() {
        }

        /**
         * Wait for an element to appear in the DOM
         * with the `MutationObserver` API.
         * 
         * Credit : https://stackoverflow.com/a/61511955
         * 
         * @param {HTMLElement} selector The CSS selector to run. 
         * @param {HTMLElement | undefined} root The element to scan for the selector in. Defaults to `document`.
         * @returns The element corresponding to the selector in the root.
         */
        waitForElement(selector, root) {
            root ??= document;

            return new Promise(resolve => {
                if (root.querySelector(selector)) {
                    return resolve(root.querySelector(selector));
                }

                const observer = new MutationObserver(mutations => {
                    if (root.querySelector(selector)) {
                        resolve(root.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(root, {
                    childList: true,
                    subtree: true
                });
            });
        }

        /**
         * Change the favicon by creating a new `<link rel="icon" ...>`,
         * thus replacing the current one.
         * 
         * @param {string} url The URL pointing to the new favicon source.
         */
        setFavicon(url) {
            console.debug('Setting favicon (onload)...');
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = favicon;
        }

        /**
         * Set the new icon from the URL in place of the X icon.
         * 
         * @param {string} url The URL pointing to the icon.
         */
        setIcon(url) {
            // Replace the top-left corner icon
            this.waitForElement('header').then(header => {
                console.debug('Getting the container...');

                // Get the header to access later to SVG icons
                // Get the div that contains the fucking ugly shit X icon
                // REVIEW: Find a better way to point to the div
                this.waitForElement('div.css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-q4m81j.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-18u37iz.r-16y2uox.r-1777fci', header).then(div => {
                    console.debug('Emptying the container...');

                    // Remove everything inside it
                    div.innerHTML = '';
                    
                    console.debug('Remplacing the image...');

                    // Create the element
                    const image = new Image(40, 40);
                    image.src = url;

                    // Add it to the container
                    div.appendChild(image);
                })
            });
        }

        /**
         * Change the loading icon.
         * 
         * @param {string} url The URL pointing to the new icon source.
         */
        setLoadingIcon(url) {
            console.debug('Changing loading icon...');

            this.waitForElement('#placeholder').then(div => {
                // FIXME: Can't remove the X icon in the first frames
                // Remove the old icon
                div.innerHTML = '';
            
                const image = new Image(300, 300);
                image.src = url;
                image.style.margin = 'auto';
                image.style.display = 'block';

                div.appendChild(image);
            });
        }

        /**
         * Replace 'X' by 'Twitter in the title.
         * 
         * @param {HTMLElement} element The <title> element.
         */
        fixTitle(element) {
            const pattern = /(.+)(\s*\/\s*)X/;

            /**
             * @type string
             */
            const title = element.textContent;

            /**
             * @type string
             */
            const newTitle = title.replace(pattern, '$1$2Twitter');
            element.textContent = newTitle;
        }

        /**
         * Monitor the <title> element in <head>
         * to replace the X title by Twitter
         */
        fixContinouslyTitle() {
            this.waitForElement('title', document.head).then(element => {
                const main = document.body.querySelector('main');

                const observer = new MutationObserver(mutations => {
                    this.fixTitle(element);
                });

                observer.observe(main, {
                    childList: true,
                    subtree: true
                });
            });
        }
    }

    const antiX = new AntiX();
    antiX.setLoadingIcon(logo);
    antiX.setFavicon(favicon);
    antiX.setIcon(logo);
    antiX.fixContinouslyTitle();
})();