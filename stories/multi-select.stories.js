import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Test component", module)
    .add(
        "Test",() => {
            return (
                <div>
                    Test
                </div>
            );
        }
    );
