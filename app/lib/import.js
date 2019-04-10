var principal = "main";
SystemJS.config({
    packages: {
        "js": {
            "main": principal,
            "defaultExtension": "js"
        }
    }
});
System.import("js");