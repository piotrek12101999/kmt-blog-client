interface IContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => (
  <>
    <div className="container"> {children} </div>
    <style jsx={true}>
      {`
        .container {
          width: 100%;
          box-sizing: border-box;
          margin-left: auto;
          margin-right: auto;
          padding-left: 16px;
          padding-right: 16px;
        }

        @media (min-width: 600px) {
          .container {
            padding-left: 24px;
            padding-right: 24px;
          }
        }

        @media (min-width: 960) {
          .container {
            padding-left: 32px;
            padding-right: 32px;
          }
        }

        @media (min-width: 1280px) {
          .container {
            max-width: 1280px;
          }
        }
      `}
    </style>
  </>
);

export default Container;
