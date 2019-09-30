import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import initialDropzoneImage from "../images/dropzone300.png";

const thumb = {
    display: "inline-flex",
    marginLeft: "auto",
    marginRight: "auto",
    width: "180px",
    height: "180px",
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
    },
    thumbsContainer: {
        display: "block",
        height: "180px",
        width: "180px",
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export function FileDrop(props) {
    const [dropzoneImage, setDropzoneImage] = useState(initialDropzoneImage);
    const { option, setImageFile } = props;
    const classes = useStyles();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
        <section>
            <div className={classes.thumbsContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={thumb} key={option}>
                    <div style={thumbInner}>
                        <img src={dropzoneImage} style={img} alt="option" />
                    </div>
                </div>
            </div>
        </section>
    );
}
