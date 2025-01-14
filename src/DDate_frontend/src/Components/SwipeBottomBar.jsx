import React from "react";

const SwipeBottomBar = () => {
  return (
    <div
      className="fixed inset-x-0 z-2 bottom-0 ml-0 mr-0 w-auto rounded-sm mx-3 py-4 flex justify-evenly items-center text-white"
      style={{
        background: "radial-gradient(2820.48% 61.56% at 50.59% 46%, #222 0%, #000 100%)"}}
    >
      <button className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 27 23"
          fill="none"
        >
          <path
            d="M19.5268 0C17.0377 0 14.8584 1.064 13.5 2.8625C12.1416 1.064 9.96228 0 7.47321 0C5.49188 0.00221995 3.59234 0.785612 2.19132 2.17831C0.790305 3.571 0.00223321 5.45927 0 7.42883C0 15.8162 12.5104 22.6052 13.0432 22.8856C13.1836 22.9607 13.3406 23 13.5 23C13.6594 23 13.8164 22.9607 13.9568 22.8856C14.4896 22.6052 27 15.8162 27 7.42883C26.9978 5.45927 26.2097 3.571 24.8087 2.17831C23.4077 0.785612 21.5081 0.00221995 19.5268 0ZM13.5 20.9445C11.299 19.6696 1.92857 13.862 1.92857 7.42883C1.93049 5.96762 2.51527 4.5668 3.55467 3.53356C4.59408 2.50033 6.00327 1.91902 7.47321 1.91712C9.81763 1.91712 11.786 3.15845 12.608 5.15226C12.6807 5.32807 12.8043 5.47844 12.9631 5.58427C13.1219 5.69009 13.3088 5.74659 13.5 5.74659C13.6912 5.74659 13.8781 5.69009 14.0369 5.58427C14.1957 5.47844 14.3193 5.32807 14.392 5.15226C15.214 3.15486 17.1824 1.91712 19.5268 1.91712C20.9967 1.91902 22.4059 2.50033 23.4453 3.53356C24.4847 4.5668 25.0695 5.96762 25.0714 7.42883C25.0714 13.8524 15.6986 19.6684 13.5 20.9445Z"
            fill="white"
          />
        </svg>
        {/* <span className="text-xs">Notification</span> */}
      </button>
      <button className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 27 28"
          fill="none"
          className="mr-2"
        >
          <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>

          <path
            d="M1.42105 25.4104L6.52263 20.3088H22.7368C23.4906 20.3088 24.2135 20.0094 24.7465 19.4764C25.2795 18.9434 25.5789 18.2205 25.5789 17.4667V4.67722C25.5789 3.92345 25.2795 3.20055 24.7465 2.66755C24.2135 2.13455 23.4906 1.83512 22.7368 1.83512H4.26316C3.50938 1.83512 2.78648 2.13455 2.25349 2.66755C1.72049 3.20055 1.42105 3.92345 1.42105 4.67722V25.4104ZM1.42105 27.4141H0V4.67722C0 3.54656 0.449153 2.46221 1.24865 1.66271C2.04815 0.863215 3.1325 0.414063 4.26316 0.414062H22.7368C23.8675 0.414063 24.9519 0.863215 25.7514 1.66271C26.5508 2.46221 27 3.54656 27 4.67722V17.4667C27 18.5974 26.5508 19.6817 25.7514 20.4812C24.9519 21.2807 23.8675 21.7299 22.7368 21.7299H7.10526L1.42105 27.4141Z"
            fill="white"
          />
        </svg>
        {/* <span className="text-xs">Message</span> */}
      </button>
      <button className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 37 37"
          fill="none"
        >
          <path
            d="M0 18.5C3.19876e-07 14.841 1.08501 11.2643 3.11781 8.22195C5.15062 5.17964 8.03993 2.80845 11.4204 1.40823C14.8008 0.0080068 18.5205 -0.358354 22.1092 0.355473C25.6978 1.0693 28.9942 2.83126 31.5815 5.41853C34.1688 8.0058 35.9307 11.3022 36.6445 14.8908C37.3584 18.4795 36.992 22.1992 35.5918 25.5796C34.1915 28.9601 31.8204 31.8494 28.778 33.8822C25.7357 35.915 22.1589 37 18.5 37V34.9862C21.7607 34.9862 24.9481 34.0193 27.6593 32.2078C30.3704 30.3963 32.4835 27.8215 33.7313 24.809C34.9791 21.7966 35.3056 18.4817 34.6695 15.2837C34.0333 12.0857 32.4632 9.14811 30.1575 6.84246C27.8519 4.53682 24.9143 2.96666 21.7163 2.33053C18.5183 1.69441 15.2035 2.02089 12.191 3.26869C9.17852 4.5165 6.60372 6.62958 4.79219 9.34073C2.98065 12.0519 2.01375 15.2393 2.01375 18.5H0Z"
            fill="white"
          />
        </svg>
        {/* <span className="text-xs">Profile</span> */}
      </button>
      {/* <button className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="24"
          viewBox="0 0 21 24"
          fill="none"
        >
          <path
            d="M1.5 22.4799H7.038V13.5338H13.962V22.4799H19.5V8.79858L10.5 1.90018L1.5 8.79858V22.4799ZM0 24V8.03851L10.5 0L21 8.03851V24H12.462V15.054H8.538V24H0Z"
            fill="white"
            className="w-6 h-6 mb-1"
          />
        </svg>{" "}
        <span className="text-xs">Profile</span>
      </button> */}
    </div>
  );
};

export default SwipeBottomBar;
