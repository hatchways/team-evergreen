import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import initialDropzoneImage from "../images/dropzone.png";

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justify: "space-evenly",
    marginTop: 16
};

const thumb = {
    display: "inline-flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    height: 150,
    textAlign: "center",
    padding: 4,
    boxSizing: "border-box"
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
};

const img = {
    display: "block",
    width: "auto",
    height: "100%"
};

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 180
    }
});

export function FileDrop(props) {
    const [dropzoneImage, setDropzoneImage] = useState(initialDropzoneImage);
    const { option, setImageFile } = props;
    const classes = useStyles();
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: acceptedFiles => {
            setImageFile(acceptedFiles, option);
            acceptedFiles.map(file => {
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
                setDropzoneImage(file.preview);
            });
        }
    });

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            URL.revokeObjectURL(dropzoneImage.preview);
        },
        [dropzoneImage]
    );

    return (
        <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <Typography
                    variant="subtitle1"
                    component="h4"
                    className={classes.subtitle}>
                    Drag and drop file here:
                </Typography>
            </div>
            <aside style={thumbsContainer}>
                <div style={thumb} key={option}>
                    <div style={thumbInner}>
                        <img src={dropzoneImage} style={img} alt="option" />
                    </div>
                </div>
            </aside>
        </section>
    );
}
