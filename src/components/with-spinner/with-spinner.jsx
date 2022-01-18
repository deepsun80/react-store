import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = WrapperComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        console.log(isLoading);
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrapperComponent {...otherProps} />
        )
    }

    return Spinner;
}

export default WithSpinner;