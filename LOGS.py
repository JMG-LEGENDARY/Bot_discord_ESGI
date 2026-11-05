import sys


class Logger:
  # Codes d'échappement ANSI
  RESET = "\033[0m"
  BOLD = "\033[1m"

  COLORS = {
    "INFO": "\033[36m",  # Cyan
    "WARNING": "\033[33m",  # Jaune
    "ERROR": "\033[31m",  # Rouge
    "CRITICAL": "\033[41m\033[97m\033[1m"  # Fond rouge, texte blanc vif et gras
  }

  def __init__(self):
    pass

  def _log(self, level: str, msg: str):
    color = self.COLORS.get(level, self.RESET)
    formatted_msg = f"{color}[{level}]  --  {msg}"
    print(formatted_msg, file=sys.stderr)

  def info(self, msg, exc_info=False):
    self._log("INFO", msg)

  def warning(self, msg, exc_info=False):
    self._log("WARNING", msg)

  def error(self, msg, exc_info=False):
    self._log("ERROR", msg)

  def critical(self, msg, exc_info=False):
    self._log("CRITICAL", msg)


# Exemple d'utilisation
logger = Logger()



















































































































































































































