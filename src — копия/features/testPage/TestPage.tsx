import React from "react";
import SuperInputText from "../../components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/c3-SuperCheckbox/SuperCheckbox";

export const TestPage = () => {
    return (
        <div>
            <div>Test  PAGE</div>
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperButton>Button</SuperButton>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
        </div>
    )
}