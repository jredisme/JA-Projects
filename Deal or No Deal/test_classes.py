'''
Use pytest to check game classes
Run pytest in deal.py terminal by typing: python -m pytest test_classes.py
'''

#Import module
import pytest

#Import game classes
from game_classes import Briefcase, PlayerBriefcase, Player, Game


def test_Briefcase():
    """Test Briefcase class"""
    briefcase = Briefcase()
    assert briefcase.number == 0
    assert briefcase.value == 0
    assert briefcase.chosen == False
    briefcase.number = 26
    assert briefcase.number == 26
    briefcase.value = 5000
    assert briefcase.value == 5000
    briefcase.chosen = True
    assert briefcase.chosen
   
def test_PlayerBriefcase():
    """Test PlayerBriefcase class"""
    player_briefcase = PlayerBriefcase()
    assert player_briefcase.number == 0
    assert player_briefcase.value == 0
    assert player_briefcase.chosen == False
    assert player_briefcase.first_choice == False
    player_briefcase.number = 26
    assert player_briefcase.number == 26
    player_briefcase.value = 5000
    assert player_briefcase.value == 5000
    player_briefcase.chosen = True
    assert player_briefcase.chosen
    player_briefcase.first_choice = True
    assert player_briefcase.first_choice

def test_Player():
    """Test Player class"""
    player = Player()
    assert player.player_bcase == PlayerBriefcase
    assert player.choices_left == 7
    assert player.took_deal == False
    player.player_bcase.number = 1
    player.player_bcase.value = 1000
    player.player_bcase.chosen = True
    player.player_bcase.first_choice = True
    player.choices_left = 5
    player.took_deal = True
    assert player.player_bcase.number == 1
    assert player.player_bcase.value == 1000
    assert player.player_bcase.chosen
    assert player.player_bcase.first_choice
    assert player.choices_left == 5
    assert player.took_deal

def test_game():
    """Test the Game class"""
    player = Player()
    game = Game()
    game.player = player
    assert game.remain_bcases == []
    assert game.player == player
    assert game.money_str == ['$0', '$1', '$5', '$10', '$25', '$50', '$75', 
                          '$100', '$200', '$300', '$400', '$500', '$750', 
                          '$1000', '$5000', '$10000', '$25000', '$50000', 
                          '$75000', '$100000', '$200000', '$300000', 
                          '$400000', '$500000', '$750000', '$1000000']
    assert game._money_int == []
    assert game.round == 0
    assert game.offer == 0
    assert game.player_turn
    assert game.banker_turn == False
    game.round = 1
    assert game.round == 1
    game.offer = 50000
    assert game.offer == 50000
    game.player_turn = False
    assert game.player_turn == False
    game.banker_turn = True
    assert game.banker_turn
