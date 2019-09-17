import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justify: "space-evenly",
    marginTop: 16
};

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
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
    const [files, setFiles] = useState([]);
    const { option, setImageFile } = props;
    const classes = useStyles();
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: acceptedFiles => {
            setImageFile(acceptedFiles, option);
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt="option" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => {
                URL.revokeObjectURL(file.preview);
            });
        },
        [files]
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
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
}
