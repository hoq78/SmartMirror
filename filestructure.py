import os

mypath = "/Users/tahmid/Documents/SmartMirror/Webpages for SmartMirror"

IMAGES = {
    ".py": [0.12, "python.png"],
    ".css": [0.1, "css.jpg"],
    ".html": [0.08, "html.png"],
    ".js": [0.08, "js.jpg"],
}
SPACES_FOR_INDENT = 4


def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]
    else:
        d['type'] = "file"
    return d

def recurse(files, fh, indent):
    for f in files:
        if f["name"].startswith("."):
            continue
        if f["type"] == "directory":
            fh.write(" "*indent*SPACES_FOR_INDENT + "\\item" + " " + f["name"] + " " + "(directory)" + "\n")
            fh.write(" "*indent*SPACES_FOR_INDENT + "\\begin{enumerate}\n")
            indent += 1
            recurse(f["children"], fh, indent)
            indent -= 1
            fh.write(" "*indent*SPACES_FOR_INDENT + "\\end{enumerate}\n")
        elif f["type"] == "file":
            f = os.path.splitext(f["name"])
            if f[1] != "" and f[1] in IMAGES:
                fh.write(" "*indent*SPACES_FOR_INDENT + "\\item" + " " + f[0] + " " + "\\includegraphics["+ "scale=" + str(IMAGES[f[1]][0]) +"]{" + IMAGES[f[1]][1] + "}" + "\n")
            else:
                fh.write(" "*indent*SPACES_FOR_INDENT + "\\item" + " " + f[0] + "\n")

if __name__ == '__main__':
    files = path_to_dict(mypath)
    fh = open("latex.tex", "w+")
    fh.write("\\begin{enumerate}\n")
    recurse(files["children"], fh, 0)
    fh.write("\\end{enumerate}\n")
