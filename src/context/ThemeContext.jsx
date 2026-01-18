import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => {
                    const nextMode = prev === "light" ? "dark" : "light";
                    localStorage.setItem("theme", nextMode);
                    return nextMode;
                });
            }
        }),
        []
    );


    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "light"
                        ? {
                            background: {
                                default: "#f9fafb",
                                paper: "#ffffff"
                            }
                        }
                        : {
                            background: {
                                default: "#0f172a",
                                paper: "#1e293b"
                            }
                        })
                },
                typography: {
                    fontFamily: "Inter, sans-serif"
                }
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ThemeContextProvider;
