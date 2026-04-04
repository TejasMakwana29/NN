{/* Dedicated CSS for Perfect Seamless Marquee Loop WITH HARDWARE ACCELERATION */}
          <style>
            {`
              @keyframes seamless-scroll {
                0% { 
                  transform: translate3d(0, 0, 0); 
                  -webkit-transform: translate3d(0, 0, 0); 
                }
                100% { 
                  transform: translate3d(-100%, 0, 0); 
                  -webkit-transform: translate3d(-100%, 0, 0); 
                }
              }
              .animate-seamless-scroll {
                animation: seamless-scroll 35s linear infinite;
                -webkit-animation: seamless-scroll 35s linear infinite;
                will-change: transform; /* Tells browser to optimize this element */
                transform: translateZ(0); /* Forces GPU Acceleration */
                -webkit-transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
              }
            `}
          </style>