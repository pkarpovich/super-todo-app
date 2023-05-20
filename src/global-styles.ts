import { css } from "@linaria/core";

export const globalStyles = css`
  :global(html) {
    html {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      font-size: 20px;
      line-height: 1.4286;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    #root {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex: 1;

      & > div {
        flex: 1;
      }
    }
  }
`;
