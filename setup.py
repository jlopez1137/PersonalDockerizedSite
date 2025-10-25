from setuptools import setup, find_packages

setup(
    name="personal-website",
    version="1.0.0",
    description="Personal Portfolio Website Flask Application",
    author="Joaquin Lopez",
    author_email="lopejo@iu.edu",
    python_requires=">=3.9",
    install_requires=[
        "Flask>=2.2.0,<3.0.0",
        "gunicorn>=20.1.0,<22.0.0",
        "python-dotenv>=0.19.0,<2.0.0",
        "Werkzeug>=2.2.0,<3.0.0",
        "Jinja2>=3.0.0,<4.0.0",
        "MarkupSafe>=2.0.0,<3.0.0",
        "itsdangerous>=2.0.0,<3.0.0",
        "click>=8.0.0,<9.0.0",
        "blinker>=1.4.0,<2.0.0",
    ],
    extras_require={
        "test": [
            "pytest>=7.0.0,<8.0.0",
            "pytest-flask>=1.2.0,<2.0.0",
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.13",
    ],
)
