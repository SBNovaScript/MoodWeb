import React from "react";
import {FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from "@material-ui/core";

interface props {
    innerLabel: string,
    underLabel: string,
    aria: string,
    onChange: (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => void,
    value: number
}

const FormSelectWithLabels: React.FunctionComponent<props> =
    ({
         innerLabel,
         underLabel,
         aria, onChange,
         value,
         children
    }) => {
    return (
        <FormControl>
            <InputLabel htmlFor={innerLabel + '-id'}>{innerLabel}</InputLabel>
            <Select value={value} id={innerLabel + '-id'} onChange={onChange} aria-describedby={aria} >
                {children}
            </Select>
            <FormHelperText id={innerLabel + '-text-id'}>{underLabel}</FormHelperText>
        </FormControl>
    );
}

export default FormSelectWithLabels;