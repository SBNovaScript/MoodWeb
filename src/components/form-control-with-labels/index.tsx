import React from "react";
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";

interface props {
    innerLabel: string,
    underLabel: string,
    aria: string,
    onChange: (e: any) => void
}

const FormControlWithLabels: React.FunctionComponent<props> = (inputProps: props) => {
    const {innerLabel, underLabel, aria, onChange} = inputProps;
    return (
        <FormControl>
            <InputLabel htmlFor={innerLabel + '-id'}>{innerLabel}</InputLabel>
            <Input id={innerLabel + '-id'} onChange={onChange} aria-describedby={aria} />
            <FormHelperText id={innerLabel + '-text-id'}>{underLabel}</FormHelperText>
        </FormControl>
    );
}

export default FormControlWithLabels;