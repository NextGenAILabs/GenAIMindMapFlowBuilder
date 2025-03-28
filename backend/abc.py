import subprocess


def poetry_add_from_requirements(requirements_path: str):
    with open(requirements_path, "r") as file:
        lines = file.readlines()

    for line in lines:
        dep = line.strip()
        if not dep or dep.startswith("#") or "@" in dep:
            continue  # skip blank lines, comments, or direct URLs

        print(f"🔧 Adding: {dep}")
        try:
            subprocess.run(["poetry", "add", dep], check=True)
        except subprocess.CalledProcessError:
            print(f"❌ Failed to add: {dep}")


# Example usage:
poetry_add_from_requirements("./requirements.txt")
