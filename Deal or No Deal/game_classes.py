'''
Define game classes
'''

#Import modules
import random
from abc import ABC


class BriefcaseTemplate(ABC):
    """Defines the abstract briefcase template class"""
    def __init__(self, number=0, value=0, chosen=False):
        self.number = number
        self.value = value
        self.chosen = chosen
    def __str__(self):
        """Magic method returning value in briefcase"""
        return f'${self.value}'
                

class Briefcase(BriefcaseTemplate):
    """Defines the parent Briefcase class"""
    def __init__(self, number=0, value=0, chosen=False):
        super().__init__(number, value, chosen)


class PlayerBriefcase(Briefcase):
    """Defines the child PlayerBriefcase class"""
    def __init__(self, number=0, value=0, chosen=False, 
                 first_choice=False):
        super().__init__(number, value, chosen)
        self.first_choice = first_choice


class Player:
    """Defines the Player class"""
    def __init__(self, player_bcase=PlayerBriefcase, choices_left=7, 
                 took_deal=False):
        self.player_bcase = player_bcase
        self.choices_left = choices_left
        self.took_deal = took_deal


class Game:
    """Define the Game class"""
    def __init__(self):
        self.remain_bcases = []
        self.player = Player(player_bcase=PlayerBriefcase())
        self.money_str = ['$0', '$1', '$5', '$10', '$25', '$50', '$75', 
                          '$100', '$200', '$300', '$400', '$500', '$750', 
                          '$1000', '$5000', '$10000', '$25000', '$50000', 
                          '$75000', '$100000', '$200000', '$300000', 
                          '$400000', '$500000', '$750000', '$1000000']
        self._money_int = []
        self.round = 0 
        self.offer = 0 
        self.player_turn = True 
        self.banker_turn = False

    def randomize_briefcases(self):
        """Random the briefcase values"""
        #Replace '$', convert to int, put values in list
        self._money_int = list(map(lambda amount_str: 
                                   int(amount_str.replace('$', '')), 
                                   self.money_str)
                                   )
        random.shuffle(self._money_int)
        #Create briefcases 1 through 26
        for i in range(1, 27):
            value = self._money_int[i-1]
            briefcase = Briefcase(i, value)
            self.remain_bcases.append(briefcase)

    def calculate_offer(self):
        """Calculate the bank offer"""
        #Remaining value = values from unchosen cases, + player case
        total_val_left = sum(briefcase.value for briefcase in self.remain_bcases 
                             if briefcase.chosen==False)
        total_val_left = total_val_left + self.player.player_bcase.value
        #Initialize cases left to 1, to account for player briefcase
        total_cases_left = 1
        for briefcase in self.remain_bcases:
            if briefcase.chosen==False:
                total_cases_left += 1
        #Offer is the rounded average of the amounts left in play
        self.offer = f'${round(total_val_left / total_cases_left)}'
        
    def __len__(self):
        """Magic method returns number of unchosen briefcases"""
        return len([briefcase for briefcase in self.remain_bcases 
                    if briefcase.chosen == False])
